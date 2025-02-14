import React from 'react';
import { forwardRef, useRef } from 'react';
import { ViewProps } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import { mergeRefs } from '../utils/mergeRefs';

type SdcWebViewProps = {
  source: WebViewProps['source'];
  style: ViewProps['style'];
} & WebViewProps

export const SdcWebView = forwardRef<WebView, SdcWebViewProps>(function SdcWebView({
    source,
    style,
    onMessage,
    onNavigationStateChange,
    injectedJavaScriptBeforeContentLoaded,
    onShouldStartLoadWithRequest,
    ...props
}, ref) {
    const WebViewRef = useRef<WebView>(null);
    const refs = mergeRefs(ref, WebViewRef);

    return <WebView
      ref={refs}
      source={source}
      originWhitelist={['*']}
      onNavigationStateChange={(event) => {
        onNavigationStateChange?.(event);
      }}
      injectedJavaScriptBeforeContentLoaded={[injectedJavaScriptBeforeContentLoaded ?? ''].join('\n')}
      onMessage={(event) => {
        onMessage?.(event);
      }}
      onShouldStartLoadWithRequest={(req) => {
        return onShouldStartLoadWithRequest?.(req) ?? true;
      }}
      style={[{ flex: 1 }, style]}
      {...props}
    />;
});
