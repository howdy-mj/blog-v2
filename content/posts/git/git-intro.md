---
title: 'Git 알아보기'
date: '2020-7-24'
tags: ['git']
draft: false
---

<div style="text-align: center; font-size: 14px; color: gray"><img src="https://user-images.githubusercontent.com/58619071/193440026-85cd3c19-007a-421f-807c-7949ff991238.jpg" style="width: 300px;"><p>https://1boon.kakao.com/ppss/5944f90a6a8e510001e7201b</p></div>

과제 혹은 업무를 할 때 다들 겪어봤을 법한 일이다.

이렇게 저장하다보면 어떤 것이 진짜 최종이고, 어느 부분이 수정되었는지 기억이 나지 않아 결국 파일 하나하나 열어보면서 확인해야 한다.

개발 할 때도 같다. 혼자 프로젝트 할 때도 있지만, 대부분은 다른 개발자와 같이 프로젝트를 진행한다. 동시에 하나의 프로젝트를 진행하다보면 어떤 것을 최종으로 결정할 것인지, 병합은 어떻게 하는지 생각해 봐야 한다.

그러다 만약 에러라도 난다면, 에러 찾느라 한 세월, 복구하느라 한세월 걸리거나 심지어 다시 처음부터 작업해야 할 수도 있다.

이를 해결 하기 위해 나온 것이 Git이다.

## Git

Git은 VCS(Version Control System: 버전 관리 시스템)로, 여기서 버전은 소스코드(source code) 파일 버전을 말한다.

### Git이 나온 배경 - VCS

그렇다면 과연 VCS가 무엇일까?

우리가 '진짜 진짜 최종'이란 파일명을 만드는 것을 방지해준다. 우리 컴퓨터의 어느 공간에 파일의 수정 사항과 날짜 등의 메타 데이터를 저장한다. 이러한 저장 공간을 version database라 한다.

<div style="text-align: center; font-size: 12px; color: gray"><img src="https://git-scm.com/book/en/v2/images/local.png" style="width: 350px;"><p>https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control</p></div>

그 후, 다른 개발자와 협업을 위해 **Centralized Version Control Systems(CVCSs, 중앙 버전 관리 시스템)**이 개발되었다.

<div style="text-align: center; font-size: 12px; color: gray"><img src="https://git-scm.com/book/en/v2/images/centralized.png"  style="width: 350px;"><p>https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control</p></div>

하지만 치명적인 단점이 있었다. 만약 백업을 하지 않은 상태에서 중앙 서버가 털린다면 모든 작업물이 없어지는 것과 같았다.

그래서 Git, Mercurial 등과 같은 **Distributed Version Control Systems(DVCSs, 분산 버전 관리 시스템)**이 나왔다.

<div style="text-align: center; font-size: 12px; color: gray"><img src="https://git-scm.com/book/en/v2/images/distributed.png"  style="width: 350px;"><p>https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control</p></div>

이로 인해, 서버가 죽더라도 각자의 컴퓨터에서 최신 버전의 코드들을 백업할 수 있다.

<br />

### 세 가지 상태(States)

Git으로 버전 관리를 할 때 크게 _modified, stage, committed_ 이 3가지 상태가 있다.

- **Modified**: 파일 수정이 있지만 아직 데이터베이스에 commit(커밋)을 안한 상태
- **Staged**: 현재 버전에서 수정 사항을 체크하고 다음 커밋에 들어갈 상태
- **Committed**: 로컬 데이터베이스에 저장된 상태

<div style="text-align: center; font-size: 12px; color: gray"><img src="https://git-scm.com/book/en/v2/images/areas.png"  style="width: 400px;"><p>https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F</p></div>

<br />

### Git 설치

Git을 사용하려면 먼저 설치부터 해야 한다. 자신의 운영 환경에 따라 설치하는 방법이 다르니 자세한 설치는 [공식 홈페이지](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)를 참고하자.

<br />

### Git Repository

Git을 사용하다보면 Repository란 단어를 자주 본다.

Repository는 Local과 Remote로 나뉘는데, Local은 자신의 컴퓨터에 저장되는 저장소를, Remote는 원격 저장소(ex. GitHub)를 뜻한다.

이는 구글 드라이브나 Dropbox, 네이버 클라우드 같은 원격 저장소와 비슷하다. 내 컴퓨터에도 같은 것이 있지만, 인터넷에 올림으로써 백업을 해두는 것과 같다.

평소 자신의 컴퓨터에서 작업하고 파일을 공유하고 싶다면 Remote repository에 업로드하면 되고, 반대로 다른 사람의 파일을 Local repository로 가져올 수 있다.

**Local repository 생성**:

```shell
$ mkdir git-test # 폴더 생성
$ cd git-test # 해당 폴더로 이동
$ git init # 폴더에 git repository 생성
```

**GitHub에서 Clone**:

```shell
$ git clone 주소 # 내 컴퓨터에 복제
$ cd 폴더명 # 해당 폴더로 이동
```

<br />

### 자주 쓰이는 Git 명령어

파일을 수정하고 수정사항을 Remote repository에 반영하고 싶다면, `add`, `commit`, `push`로 업로드 할 수 있다.

```shell
$ git add .
# 수정된 파일 전부 stage 상태로 변경

$ git add -A
# 수정된 파일 전부 stage 상태로 변경

$ git add 파일명.확장자
# '파일명.확장자'만 stage 상태로 변경

$ git commit -m "커밋내용"
# 어떤 내용이 변경되었는지 잘 적어놓는 것이 좋다

$ git push origin master
# origin [브랜치명], push작업이 끝나면 GitHub에서 확인 가능
```

그 외, 자주 쓰는 명령어:

```shell
$ git remote add origin 주소
# remote repo에 연걸하기

$ git remote -v
# 현재 폴더의 원격 저장소 보기

$ git remote remove origin
# 현재 remote repo 삭제하기

$ git status
# 현재 어떤 상태에 있는지 보기

$ git stash
# 작업 중이다 다른 브랜치로 이동할 때 저장해두는 작업

$ git stash list
# 저장 목록 조회

$ git stash pop
# 저장 내용 복구

$ git stash apply
# 저장된 내용을 다른 브랜치에 적용

$ git stash drop
# 저장된 내용 삭제
```

branch(브랜치) 관련 명령어:

```shell
$ git branch
# 모든 브랜치 및 현재 위치한 브랜치 보기

$ git checkout 브랜치명
# '브랜치명'이란 브랜치 생성하기

$ git branch -D 브랜치명
# '브랜치명'의 브랜치 삭제

$ git push origin :브랜치명
# 삭제한 브랜치의 remote 브랜치도 삭제하기
```

만약 원격 저장소에 올리고 싶지 않은 것이 있다면, `.gitignore` 파일을 만들어 안에 해당하는 파일 혹은 폴더명을 적으면 된다.

<br />

**참고**

<div style="font-size: 12px;">

- https://git-scm.com/

</div>
