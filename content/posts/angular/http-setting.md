---
title: Angular에서 http 초기 세팅하기
date: '2021-8-4'
tags: [angular]
draft: false
---

프로젝트 초기에 api 설정 파일을 만들어두면 나중에 작업하기 편하다.

Angular는 `@angular/common` 안에 존재하는 http 패키지를 사용하면 된다.

## 프로젝트 생성

```shell
# 앵귤러가 없을 시 설치
$ npm install -g @angular/cli

# 앵귤러 프로젝트 생성
$ ng new 프로젝트명

# 로컬에서 실행
$ ng serve
# or
$ yarn start
```

http 작업을 하기 위해 `src/app.module.ts`에서 <span class="variable">HttpClientModule</span>을 import 해야 한다.

<span class="file-location">src/app.module.ts</span>

```ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  // BrowserModule 다음에 HttpClientModule를 작성해야 한다
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## ApiService 구축

api는 전역에서 사용하는 것이기 때문에 service로 만든다. (<a class="post-link" href="https://www.howdy-mj.me/angular/angular-structure/#angular-%EA%B5%AC%EC%A1%B0" target="_blank">Angular 파일 구조 소개</a> 참고)

필자는 `src/api` 폴더 아래에 `api.service.ts` 파일을 만들었다.

<span class="file-location">src/api/api.service.ts</span>

```ts
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
}
```

> <span class="variable">Injectable</span>이기 때문에 다른 module에서 import하지 않아도 바로 사용할 수 있다.

<br />

### baseUrl 설정

이제 불러 올 api의 baseUrl을 설정해준다.

```ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public BASE_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}
}
```

보통 `BASE_URL`은 각 프로젝트의 `.env`에서 환경 별로 다르게 설정한다.

<span class="file-location">src/environments/environments.ts</span>

```ts
// environment.test.ts
export const environment = {
  production: false,
  baseUrl: 'https://test.api.example.com',
}

// environment.prod.ts
export const environment = {
  production: true,
  baseUrl: 'https://api.example.com',
}
```

이렇게 설정한 후, `src/api/api.service.ts`에 아래 처럼 불러오면 된다.

```ts
import { environment } from '../../environments/environment'
// ...생략
export class ApiService {
  public BASE_URL = environment.baseUrl
}
```

<br />

### http 메서드 설정

<span class="file-location">src/api/api.service.ts</span>

```ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public BASE_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}${endPoint}`)
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}${endPoint}`, body)
  }

  put<T>(endPoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}${endPoint}`, body)
  }

  delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}${endPoint}`)
  }
}
```

Angular의 http의 return 타입은 모두 <span class="return">Observable</span>이기 때문에, 할당할 변수의 타입도 Observable로 지정해야 한다.

<span class="file-location">src/pages/home.components.ts</span>

```ts
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/api/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos$: Observable<
    {
      id: number
      title: string
      userId: number
      completed: boolean
    }[]
  >

  constructor(private api: ApiService) {
    this.todos$ = this.api.get('/todos')
    this.todos$.subscribe(console.log) // console 확인
  }

  ngOnInit(): void {}
}
```

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193413542-650c2ce6-6e39-492b-bded-f57714abf882.png" alt="todos console">
  <p>todos console</p>
</div>

console로도 데이터가 잘 들어오는 걸 확인할 수 있다.

## Error 처리

만약 에러를 처리하고 싶다면, 각 api 요청마다 설정할 수도 있지만 `api.service.ts`에서 설정 해줘도 된다.

<span class="file-location">src/api/api.service.ts</span>

```ts
import { catchError } from 'rxjs/operators'
// ...생략

export class ApiService {
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error:', error.error)
    } else {
      console.error(`Backend error ${error.status}, ${error.error}`)
    }
    return throwError('예기치 못한 에러가 발생했습니다. 다시 시도해주세요.')
  }

  get<T>(endPoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.BASE_URL}${endPoint}`)
      .pipe(catchError(this.handleError))
  }
}
```

<br />

**참고**

<div>

- [Communicating with backend services using HTTP](https://angular.io/guide/http#requesting-data-from-a-server)

</div>
