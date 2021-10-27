#import "HuddleStatusBar.h"
#import <React/RCTLog.h>

@implementation HuddleStatusBar

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setBarStyle:(NSString *)barStyle)
{
  dispatch_async(dispatch_get_main_queue(), ^{
      if ([barStyle isEqualToString:@"light-content"]) {
          [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;

        } else if ([barStyle isEqualToString:@"dark-content"]) {
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
  __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
          if (@available(iOS 13.0, *)) {
            [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDarkContent;
          } else {
            [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
          }
#else
          [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
#endif
        } else {
          [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
        }
  });
}

@end
