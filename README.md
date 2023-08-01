今天碰到一个`bug`,关于使用`NSURLProtocol`拦截网络那个,这个苹果真是坑爹
`NSURLProtocol`拦截之后,竟然造成`NSURLSessionTaskDelegate`不支持上传和下载的`progress`回调,

这种官方`bug`真没辙,只能指定忽略拦截某些`URL`了,不然没发玩

本来一开始还不信,文件下载可以覆盖到,想着怎么模拟一个文件上传的进度回调的例子

几经搜索,找到了一个可用的`node`版本本地服务~ 遂放此记录一笔 



###  开启本地服务

```js
cd fileSystem && npm i && npm run dev
```

### 访问文件上传接口

`http://localhost:3000/uploadfile`   POST请求 

###  iOS使用AFNetworking上传

```objc
    NSString *path = [[NSBundle mainBundle] pathForResource:@"111" ofType:@"png"];
    NSData *data = [NSData dataWithContentsOfFile:path];

    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    [manager POST:@"http://localhost:3000/uploadfile" parameters:nil headers:nil constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        [formData appendPartWithFileData:data name:@"file" fileName:@"111.png" mimeType:@"image"];
        } progress:^(NSProgress * _Nonnull uploadProgress) {
            NSLog(@"%ld/%ld",uploadProgress.completedUnitCount,uploadProgress.totalUnitCount);
        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
            NSLog(@"responseObject %@",responseObject);
        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            NSLog(@"error %@",error);
        }];
```