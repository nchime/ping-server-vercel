## Vercel 설치 방법

### Vercel CLI 설치
```
$ npm i -g vercel
```
### Vercel에 로그인

```
$ vercel login (vercel 사이트 미리 가입해 주세요)
```
$ vercel
```

## 사용법

### 송신자 
```
$ curl -T test.txt https://piping-server-vercel.vercel.app/mychannel
```

### 수신자
```
$ curl https://piping-server-vercel.vercel.app//mychannel -o received.txt
```