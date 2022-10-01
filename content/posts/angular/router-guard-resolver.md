---
title: Angular 라우터의 Guard와 Resolver
date: '2021-8-21'
tags: [angular]
draft: false
---

> 본 글은 <a href="https://github.com/howdy-mj/angular-rxjs-playground/tree/feature/guard-init" target="_blank">feature/guard-init</a>을 clone 받아 따라할 수 있으며, 완성된 코드는 <a href="https://github.com/howdy-mj/angular-rxjs-playground/tree/feature/guard" target="_blank">feature/guard</a>에서 확인 가능하다.

<br />

Angular 라우터는 각 컴포넌트의 `module.ts`에 작성한다.

```ts
// 생략

const appRoutes: Routes = [
  { path: '/', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
    // ...생략
  ],
  ...
})
export class AppModule {}
```

기본적인 라우팅 설정은 최상단 모듈인 `app.module.ts`에 위 코드처럼 path와 component를 작성하고, import하면 된다. 단, 하위 페이지 module에는 `RouterModule.forRoot`가 아닌 `RouterModule.forChild`로 import한다.

이 외, 앵귤러 라우터에서는 **Guard**를 지원한다.

보통 guard를 이용해 로그인한 유저만 볼수 있는 페이지를 구축한다. 이 외에도 해당 페이지에 진입할때 필요한 api를 호출하는 것과 미리 필요한 데이터를 보여주는 것, 해당 페이지에서 다른 곳으로 이동할 때 alert 경고를 띄우는 것이 모두 가능하다.

<div style="margin-bottom: 40px"></div>

#### RouterModule.forRoot와 RouterModule.forChild

해당 프로젝트에는 모든 페이지의 url이 `/`로 시작하기 때문에 `RouterModule.forRoot`가 비어 있다. 만약 메인에서 서로 다른 url이 분기된다면 아래 처럼 작성할 수 있다.

<span class="file-location">src/app/app-routing.module.ts</span>

```ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(module => module.HomeModule),
  },
  // 다른 path와 module
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

단 위처럼 작성해도, `home.module.ts`에 `RouterModule.forChild`를 명시해줘야 화면에 정상적으로 반영된다.

## 라우터 설정

다시 본론으로 돌아와, 프로젝트를 실행해보자.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193413713-42803ca4-fd4f-4539-8e08-6c3aa3f6d1a2.png" alt="프로젝트 첫 화면">
  <p>메인 화면</p>
</div>

본 글에서는 `/counter` 페이지에 guard와 resolve를 만들어 볼 것이다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193413711-07e1038c-de04-4e12-9dd5-43584cd24c7d.png" alt="counter">
  <p>counter 화면</p>
</div>

counter 페이지는 간단하게 숫자를 더하고 뺄수 있는 화면이다.

<br>

앵귤러 라우터는 기본적으로 제공하는 <a href="https://angular.io/api/router" target="_blank">기능</a>이 다양하다. 이 중, 가장 많이 사용하는 CanActivate, CanDeactivate, Resolve를 다뤄보겠다.

### CanActivate

해당 데이터가 있을 때만 라우팅을 할 수 있도록 설정하는 것이기 때문에 CanActivate를 선택한다.

```shell
# 원하는 위치에 guard를 생성
$ ng g guard pages/counter/guard/counter-data
# 선택지에서 CanActivate 선택
```

<span class="file-location">src/app/pages/counter/guard/counter-data.guard.ts</span>

```ts
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class CounterRouteGuard implements CanActivate {
  // 우선 필요없는 return 타입 제거
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return 값이 true여야 해당 페이지로 이동 가능
    return true
  }
}
```

그리고 module에 생성한 guard를 추가해준다.

<span class="file-location">src/app/pages/counter/counter.module.ts</span>

```ts{14}
// 생략...
@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [CounterDataGuard],
      },
    ]),
    StoreModule.forRoot({ counter: counterReducer }),
  ],
})
```

이번에는 api를 먼저 호출하고 그 값이 존재할때 true를 반환해주는 guard를 만들어보겠다. 해당 프로젝트에서 설정한 api는 <a href="https://www.howdy-mj.me/angular/http-setting/" target="_blank">Angular에서 http 초기 세팅하기</a>를 참고하면 된다.

<span class="file-location">src/app/pages/counter/guard/counter-data.guard.ts</span>

```ts
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { map } from 'rxjs/operators'
import { ApiService } from '../../../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class CounterDataGuard implements CanActivate {
  constructor(private api: ApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.api.get('/todos').pipe(
      map(todos => {
        if (todos) {
          return true
        }
        return false
      })
    )
  }
}
```

위처럼 작성하고 counter 페이지를 진입하면, network 탭에서 먼저 api를 호출한 후, counter UI가 보이는 것을 확인할 수 있다.

<br>

### CanDeactivate

CanActivate와는 반대로 해당 페이지에서 나갈 때 확인한다. 보통 어떤 작성 중인것을 저장 안하고 다른 페이지로 이동할때 사용된다.

```shell
# 원하는 위치에 guard를 생성
$ ng g guard pages/counter/guard/counter-deactivate
# 선택지에서 CanDeactivate 선택
```

<span class="file-location">src/app/pages/counter/guard/counter-deactivate.guard.ts</span>

```ts
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { CounterComponent } from '../containers/counter.component'

@Injectable({
  providedIn: 'root',
})
export class CounterDeactivateGuard implements CanDeactivate<CounterComponent> {
  canDeactivate(
    component: CounterComponent, // 사용할 컴포넌트
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    return true
  }
}
```

간단하게 boolean으로 return 값을 받을 거기 때문에 필요없는 type은 제거했다. module에 잊지말고 import해주자.

<span class="file-location">src/app/pages/counter/counter.module.ts</span>

```ts{17}
// ...생략
import { CounterDeactivateGuard } from './guard/counter-deactivate.guard'

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [CounterDataGuard],
        canDeactivate: [CounterDeactivateGuard],
      },
    ]),
    StoreModule.forRoot({ counter: counterReducer }),
  ],
})
export class CounterModule {}
```

`CanDeactivate`는 페이지를 이탈할 때, 현재 route 정보와 이동할 페이지의 url를 알 수 있다. 이를 통해 특정 페이지로 이동할때 어떤 조건을 체크한다던지, 라우팅을 못하게 막는다던지 등의 행위를 할 수 있다. 여기서는 '/counter' 페이지에서 '/text-directive'로 이동하지 못하게 막아보자.

<span class="file-location">src/app/pages/counter/guard/counter-deactivate.guard.ts</span>

```ts
// ...생략
@Injectable({
  providedIn: 'root',
})
export class CounterDeactivateGuard implements CanDeactivate<CounterComponent> {
  canDeactivate(
    component: CounterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (nextState.url === '/text-directive') {
      return false
    }
    return true
  }
}
```

이렇게 하면 text-directive 버튼을 눌러도 페이지가 이동되지 않는다. 이 외, 페이지를 이탈할 때 component 안에 있는 함수를 실행할 수도 있다.

```ts
// ...생략
@Injectable({
  providedIn: 'root',
})
export class CounterDeactivateGuard implements CanDeactivate<CounterComponent> {
  canDeactivate(component: CounterComponent): Observable<boolean> | boolean {
    return component.checkIsTrue()
  }
}
```

<br>

### Resolver

Resolver는 라우팅이 완료 되기 전에 원하는 값을 가져와 준다. `counter/resolver` 안에 title을 가져오는 resolver를 만들어보자.

```shell
$ ng g resolver pages/counter/resolver/counter-title
```

<span class="file-location">src/app/pages/counter/resolver/counter-title.resolver.ts</span>

```ts
import { Injectable } from '@angular/core'
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class CounterTitleResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    // 기존 코드는 제거하고 간단하게 아래의 string을 반환
    return 'Counter 페이지'
  }
}
```

만약 api에서 호출하는 값이라면 Observable로 return되기 때문에 타입도 잘 명시해주는걸 잊지 말자.

<span class="file-location">src/app/pages/counter/counter.module.ts</span>

```ts{18-20}
// ...생략
import { CounterTitleResolver } from './resolver/counter-title.resolver'

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [CounterDataGuard],
        canDeactivate: [CounterDeactivateGuard],
        resolve: {
          title: CounterTitleResolver, // title이란 이름으로 저장
        },
      },
    ]),
    StoreModule.forRoot({ counter: counterReducer }),
  ],
})
export class CounterModule {}
```

<span class="file-location">src/app/pages/counter/containers/counter.component.ts</span>

```ts
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { pluck } from 'rxjs/operators'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  title: Observable<string>

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.data.pipe(pluck('title'))
    // this.title.subscribe(console.log); // console로 확인
  }
}
```

<span class="file-location">src/app/pages/counter/containers/counter.component.html</span>

```html{7}
<!-- 생략 -->

<div class="row">
  <div class="col-md-12 text-center"></div>
</div>

{{ title | async }}
```

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193413715-a0f7fba3-9224-4af0-a4f1-7de1e6c26082.png" alt="Counter title">
  <p>counter 화면</p>
</div>

Resolver항상 라우팅이 완료되기 전에 해당 값을 가져오기 때문에, `title`이 없는 경우의 상황을 고려하지 않아도 되는 장점이 있다.

## 특정 url에만 설정하기

만약 아무런 설정을 하지 않으면, module에 있는 guard와 resolver는 라우팅 될 때마다 실행된다. <a href="https://angular.io/api/router/RunGuardsAndResolvers">RunGuardsAndResolvers</a>를 통해 해당 페이지의 params나 query가 바뀔 때 실행하게도 설정할 수 있다.

<span class="file-location">src/app/pages/counter/counter.module.ts</span>

```ts
// 생략...
@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [CounterDataGuard],
        runGuardsAndResolvers: 'always', // default가 'always'
      },
    ]),
    StoreModule.forRoot({ counter: counterReducer }),
  ],
})
```

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://angular.io/api/router" target="_blank">@angular/router</a>

</div>
