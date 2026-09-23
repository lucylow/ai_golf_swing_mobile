import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { releaseLogger } from '../core/logger';
import { toAppError, type AppError } from '../core/AppError';

export class ReleaseErrorBoundary extends React.Component<
  { children: React.ReactNode; resetRoute?: string },
  { error?: AppError }
> {
  state: { error?: AppError } = {};

  static getDerivedStateFromError(error: Error) {
    return { error: toAppError(error) };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    releaseLogger.error(error, { componentStack: info.componentStack ?? 'unknown' });
  }

  private reset = () => {
    this.setState({ error: undefined });
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={{ flex: 1, backgroundColor: '#06120E', padding: 28, justifyContent: 'center' }}>
        <Text style={{ color: '#B7FF4A', fontSize: 12, fontWeight: '800', letterSpacing: 1.6, marginBottom: 10 }}>SWING COACH</Text>
        <Text style={{ color: '#F7FFF6', fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Something went wrong.</Text>
        <Text style={{ color: '#9EB3AA', lineHeight: 22, marginBottom: 24 }}>{this.state.error.userMessage}</Text>
        <Pressable onPress={this.reset} style={{ backgroundColor: '#B7FF4A', borderRadius: 16, paddingVertical: 15, alignItems: 'center' }}>
          <Text style={{ color: '#06120E', fontWeight: '800' }}>TRY AGAIN</Text>
        </Pressable>
      </View>
    );
  }
}
