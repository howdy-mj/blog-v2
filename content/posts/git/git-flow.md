---
title: 'Git flow: 배경, 브랜치'
date: '2020-7-25'
tags: ['git']
draft: false
---

<div style="font-size: 12px; font-style: italic;">
업데이트: 2021.08.22
</div>

<br>

<p style="font-size: 13px; font-style: italic"><a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" target="_blank">Gitflow Workflow</a>을 주로 참고했으며 오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>

## Git flow란?

Git flow는 [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/)이 만들 었으며, 규모가 큰 프로젝트 배포를 중점으로 브랜치 관리를 엄격하게 하는 모델이다.

기존의 Git Workflow에서 새로운 개념이나 명령어는 없으며, 각각의 브랜치에 특정한 역할을 부여하여 체계적으로 만든 것이다.

<br />

### 설치

Git flow를 사용하기 위해서는 사전에 git이 설치되어야 하며, Git flow는 MacOS, Linus, Windows에서 작동된다.

자신의 운영체제에 따라 설치하는 방법이 다르다. OSX 시스템에서는 `brew install git-flow`를, 윈도우는 [Git 다운](https://git-scm.com/download/win) 후, `git flow init`을 실행할 수 있다.

<br />

## Git flow 브랜치

Git flow에는 5가지 종류의 브랜치가 존재한다.

<div style="text-align: center;"><img src="https://miro.medium.com/max/638/0*PRJYeVCeztuOuddN.jpg">
<p style="font-size: 11px; color: gray;">https://medium.com/@olivier.bossel/git-flow-the-right-way-to-go-f2a65c315818</p></div>

프로젝트의 히스토리를 기록하는 base 브랜치로 `master`와 `develop` 브랜치, 백업이나 협업 용으로 사용하는 `feature` 브랜치, 배포를 위해 존재하는 `release` 브랜치 그리고 서비스를 빠르게 수정하고 업데이트해야 하기 위해 `hotfix` 브랜치가 있다.

### Master, Develop

<div style="text-align: center;"><img src="https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg?cdnVersion=1146">
<p style="font-size: 11px; color: gray;">https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow</p></div>

`master` 브랜치는 공식적인 배포 히스토리를 저장하며, **절대** `master` 브랜치에서 작업하지 않는다.

`develop` 브랜치는 `master` 브랜치에 커밋으로 버전을 기입하기도 편하며, 브랜치 기능의 통합(integration)을 도와준다.

**develop 브랜치 생성**:

`master` 브랜치는 프로젝트에 git init을 하면 자동으로 나타나지만, `develop` 브랜치는 따로 생성해 줘야 한다.

```shell
$ git branch develop
# develop 브랜치 생성

$ git push -u origin develop
# 서버에 debelop 브랜치 올리기
```

`develop` 브랜치는 모든 프로젝트의 기록을 다 갖고 있으며, `master` 브랜치의 축약판이라 할 수 있다. 따라서 다른 개발자들이 클론을 하면 `develop` 브랜치를 트래킹하는 브랜치를 생성해야 한다.

만약 git-flow 라이브러리를 쓴다면 `git flow init`으로 `develop` 브랜치를 만들 수 있다.

```shell
$ git flow init
Initialized empty Git repository in ~/project/.git/
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []

$ git branch
* develop
 master
```

<br />

### Feature

`feature` 브랜치는 새로운 기능(feature) 추가/개발할 때 사용되며, 백업이나 협업을 위해 중앙 repository에 push 될 수 있어야 한다. 하지만 이를 `master`에 바로 업데이트 하는 것이 아니라, `develop` 브랜치를 부모 브랜치로 삼아 merge한다.

`feature`는 **절대** `master` 브랜치와 바로 연결되어서는 안된다.

<div style="text-align: center;"><img src="https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=1146">
<p style="font-size: 11px; color: gray;">https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow</p></div>

`feature` 브랜치는 보통 최신 `develop` 브랜치에서 생성된다.

**feature 브랜치 생성**:

```shell
$ git checkout develop
# develop 브랜치에서 생성하기 위해 이동

$ git checkout -b feature/브랜치명
# 브랜치 생성 및 해당 브랜치로 이동
```

만약 git flow 확장을 쓰고 있다면,

```shell
$ git flow feature start feature/브랜치명
```

**feature 브랜치 merge**:

해당 `feature` 브랜치에서 모든 작업이 완료 되었다면, `develop` 브랜치에 merge해야 한다.

```shell
$ git checkout develop
$ git merge feature/브랜치명
```

만약 git flow 확장을 쓰고 있다면,

```shell
$ git flow feature finish 브랜치명
```

자동으로 `feature/브랜치명`으로 생성되고 해당 브랜치로 이동된다.

<br />

### Release

<div style="text-align: center;"><img src="https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg?cdnVersion=1146">
<p style="font-size: 11px; color: gray;">https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow</p></div>

`release` 브랜치는 다음 출시를 준비할 때 생성하는 브랜치로, 새로운 기능을 해당 기점 다음에 추가한다. 에러 수정, 문서 생성 그리고 다른 출시 관련 작업들 모두 해당 브랜치에서 작업한다. 출시 준비가 완료되었다면, `master` 브랜치로 merge를 시키며 버전 번호도 같이 태깅한다. 또한, 이는 `develop`에도 merge되어야 한다.

**release 브랜치 생성**:

```shell
$ git checkout develop
$ git checkout -b relase/0.1.0
```

만약 git flow 확장을 쓰고 있다면,

```shell
$ git flow release start 0.1.0
```

`master`와 `develop`에 meger가 된 후에는, 해당 `release` 브랜치는 삭제된다. 혹여나 중요한 수정사항이 생길 수 있으니, `develop` 브랜치에 백업 merge를 해두는 것이 항상 중요하다.

**release 브랜치 merge**:

```shell
$ git checkout master
$ git merge release/0.1.0
```

만약 git flow 확장을 쓰고 있다면,

```shell
$ git flow release finish '0.1.0'
```

<br />

### Hotfix

<div style="text-align: center;"><img src="https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg?cdnVersion=1146">
<p style="font-size: 11px; color: gray;">https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow</p></div>

`hotfix` 브랜치는 이미 출시 된 제품의 유지보수나 빠른 패치를 위해 사용한다. `release`와 다르게 `hotfix`는 `master` 브랜치에 기반하여 생성된다. 에러 수정을 마쳤으면 바로 `master`와 `develop` 브랜치로(혹은 현재 `release` 브랜치) merge 되며, `master`에는 업데이트된 버전 번호가 태깅되어야 한다.

**hotfix 브랜치 생성**:

```shell
$ git checkout master
$ git checkout -b hotfix/브랜치명
```

만약 git flow 확장을 쓰고 있다면,

```shell
$ git flow hotfix start 브랜치명
```

`hotfix/브랜치명`으로 생성 후, 해당 브랜치로 이동된다.

**hotfix 브랜치 merge**:

`release` 브랜치와 비슷하게 `master`와 `develop`에 모두 merge 된다.

```shell
$ git checkout master
$ git merge hotfix/브랜치명
$ git checkout develop
$ git merge hotfix/브랜치명
$ git branch -D hotfix/브랜치명 # merge된 브랜치 삭제
```

git flow 명령어,

```shell
$ git flow hotfix finish 브랜치명
```

<br />

## 주의점

- Git flow는 merge 기반의 솔루션으로, **feature/브랜치를 rebase 하지 않는다**.
- `master`에 생성되는 건 `develop`, `hotfix` 브랜치 뿐, 나머지는 `develop`에서 생성된다.
- `hotfix`는 작업이 완료되면 `develop`과 `master`에 merge 된다.

<br />

**참고**

<div style="font-size: 12px;">

- https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html
- https://guides.github.com/

</div>
