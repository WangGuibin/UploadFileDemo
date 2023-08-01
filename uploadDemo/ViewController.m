//
//  ViewController.m
//  uploadDemo
//
//  Created by 王贵彬 on 2023/8/1.
//

#import "ViewController.h"
#import <AFNetworking.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor colorWithRed:arc4random()%256/255.0f green:arc4random()%256/255.0f  blue:arc4random()%256/255.0f alpha:1.0f];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [super touchesBegan:touches withEvent:event];
    [self test];
}

- (void)test{
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
    
    
}





@end
