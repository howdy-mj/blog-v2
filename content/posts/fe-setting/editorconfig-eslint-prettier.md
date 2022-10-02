---
title: 'EditorConfig란? (vs. ESlint, Prettier)'
date: '2020-10-19'
tags: ['fe-setting']
draft: false
---

개발자가 혼자 일하는 일은 드물다. 따라서 누가 언제 참여해도 동일한 코딩 환경을 만들어주기 위한 툴이 존재한다.

[ESLint](https://eslint.org/)는 코딩 컨벤션과 에러 혹은 오류를 체크해주는 유명한 자바스크립트 프로그램이다. (이러한 프로그램을 lint 혹은 linter라고 부른다)

[Prettier](https://prettier.io/)는 ESLint와 달리 코드 퀄리티(ex. no-unused-vars, prefer-promise-reject-errors, ...)를 체크해주지 않는 단순 코드 포매터(code formatter)이다. ESLint도 코드 포매터의 역할을 할 수 있지만, Prettier에서 더 많은 설정이 가능하다. Prettier는 자바스크립트뿐만 아니라, JSX, Flow, 타입스크립트, HTML, JSON, CSS 등 언어에서 모두 사용 가능하다.

대부분 Eslint나 Prettier로 원하는 환경을 만들 수 있지만, EditorConfig를 사용하면 더 범용적인 설정도 가능하다. 특히 한 팀안에 서로 다른 에디터를 사용할 때 유용하다.

## EditorConfig

[EditorConfig](https://editorconfig.org/)는 다수의 개발자들이 각자 다른 에디터나 IDE를 사용해도 동일한 코딩 스타일을 유지하도록 도와준다. 보통 들여쓰기 스타일, 탭 너비, 줄의 끝 문자(CR/LF), 인코딩 등의 설정이 가능하다.

VS Code, Atom, Bracket, WebStorm, eclipse, Notepad++, Sublime Text, Vim 등 여러 에디터에서 사용가능하며 자세한 건 [여기](https://editorconfig.org/#download)에서 확인 가능하다.

EditorConfig는 XML을 제외한 Visual Studio가 지원하는 모든 언어에서 지원된다. 프로젝트에 EditorConfig는 파일을 추가하면, 새로 작성하는 코드에는 해당 파일에 따라 서식이 지정되지만, 기존 스타일은 변환되지 않는다.

`.editorconfig` 파일은 보통 프로젝트의 root 폴더에 생성되며, 그 아래에 있는 모든 파일에 적용된다. 만약 특정 폴더에서만 지정하고 싶은 스타일이 있다면, 해당 폴더에서 `.editorconfig` 파일을 생성하면 된다. (`.editorconfig`은 편집 중인 파일에 '가장 가까운' `.editorconfig`의 설정이 우선시 된다) 대신 root 폴더에 있는 설정 파일에 `root = true`를 작성해야 한다.

### Global Patterns

|                |                                                                        |
| :------------- | :--------------------------------------------------------------------- |
| `*`            | 경로(`/`)를 제외한 파일 혹은 폴더에 적용                               |
| `**`           | 일치하는 string이 있는 파일 혹은 폴더에 적용                           |
| `?`            | 일치하는 string이 있는 파일 혹은 폴더에 적용                           |
| `[name]`       | name과 일치하는 파일 혹은 폴더에 적용                                  |
| `[!name]`      | name과 일치하지 않는 파일 혹은 폴더에 적용                             |
| `{s1, s2}`     | 일치하는 파일 혹은 폴더에 적용 (EditorConfig Core 0.11.0 이후 버전만 ) |
| `{num1..num2}` | 양수 혹은 음수인 num1과 num2 사이의 정수에 적용                        |

<br />

**예시**:

- `/hello/**/*`: 'hello' 폴더 안의 폴더 혹은 파일에 적용
- `**/*.js`: 어떤 폴더 안의 '.js'로 끝나는 파일에 적용
- `!*.xml`: '.xml'을 제외한 파일에 적용

<span class="file-location">.editorconfig</span>

```shell
# 최상위에 있는 파일로 명시
root = true

# 모든 파일에 적용
[*]
end_of_line = lf
insert_final_newline = true

# '.js'과 '.py'로 끝나는 파일에 적용
[*.{js,py}]
charset = utf-8

# '.scss' 혹은 '.sass'로 끝나는 파일에 적용
[*.{scss,sass}]
indent_style = space
indent_size = 2

# 'Makefile'과 일치하는 파일 혹은 폴더에 적용
[Makefile]
indent_style = tab

# lib 폴더 안에 있는 .js 파일에 적용
[lib/**.js]
indent_style = space
indent_size = 2

# package.json 혹은 .travis.yml 파일에 적용
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

### EditorConfig Properties

- `indent_style`: 들여 쓰기를 'tab', 'space'중 어떤 걸로 할 것인지 설정
- `indent_size`: `indent_style = space`일 경우, 몇 칸 할 것인지 설정
- `tab_width`: `indent_style = tab`일 경우 width 설정 (기본적으로 `indent_size` 값을 따라가 거의 설정하지 않음)
- `end_of_line`: 'lf', 'cr', 'crlf'중 하나로 줄바꿈 설정

  <details>
    <summary>용어: LF, CR, CRLF</summary>
    <ul style="font-size: 14px;">
        <li><span style="font-weight: bold;">LF(Line Feed, \n)</span>: 커서를 다음 줄로 이동</li>
        <li><span style="font-weight: bold;">CR(Carriage Return, \r)</span>: 현재 커서를 줄 바꿈 없이 가장 좌측으로 이동</li>
        <li>윈도우에서는 주로 CRLF를 사용하며, 리눅스/맥(10버전 이후)에서는 LF를 사용한다</li>
    </ul>
  </details>

- `charset`: 'latin1', 'utf-8', 'utf-8-bom', 'utf-16be' or 'utf-16le' 중 하나로 문자 인코딩 방식 설정 (주로 'utf-8'로 설정)
- `trim_trailing_whitespace`: 'true'일 경우, 문자 앞의 공백을 제거
- `insert_final_newline`: 'true'일 경우, 파일을 저장할 때 새 줄로 끝남
- `root`: root 폴더의 파일에 설정하며, 'true'일 경우 `.editorconfig` 파일 검색을 중지

## 결론

따라서 만약 한 팀 내에서 서로 다른 에디터, IDE를 사용한다면 EditorConfig를 먼저 설정하고, ESLint, Prettier를 설정한다.

그게 아니라면 ESLint로 코드 퀄리티를 잡고, Prettier로 세세한 코드 포맷팅을 잡으면 된다.

<br />

**참고**

<div style="font-size: 12px;">

- https://editorconfig.org/
- https://blog.theodo.com/2019/08/why-you-should-use-eslint-prettier-and-editorconfig-together/

</div>
