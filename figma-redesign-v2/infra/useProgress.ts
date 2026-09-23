import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
export function useProgress(target: number, ms = 500) { const value = useRef(new Animated.Value(0)).current; useEffect(() => { Animated.timing(value, { toValue: target, duration: ms, useNativeDriver: false }).start(); }, [target, ms, value]); return value; }
