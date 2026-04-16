import React, { useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

function Orb({ color1, color2, style, duration, startX, startY, toX, toY }) {
    const animX = useRef(new Animated.Value(startX)).current;
    const animY = useRef(new Animated.Value(startY)).current;

    useEffect(() => {
        const moveX = Animated.sequence([
            Animated.timing(animX, { toValue: toX, duration: duration, useNativeDriver: true }),
            Animated.timing(animX, { toValue: startX, duration: duration, useNativeDriver: true }),
        ]);
        const moveY = Animated.sequence([
            Animated.timing(animY, { toValue: toY, duration: duration * 1.2, useNativeDriver: true }),
            Animated.timing(animY, { toValue: startY, duration: duration * 1.2, useNativeDriver: true }),
        ]);

        Animated.loop(moveX).start();
        Animated.loop(moveY).start();
    }, []);

    return (
        <Animated.View style={[
            styles.orb,
            style,
            { transform: [{ translateX: animX }, { translateY: animY }] }
        ]}>
            <LinearGradient
                colors={[color1, color2]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        </Animated.View>
    );
}

export default function BackgroundOrbs() {
    const { theme } = useContext(ThemeContext);
    
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.bgFilter, { backgroundColor: theme.colors.bgFilter }]} />
            <Orb 
                color1={theme.colors.orb1} color2={theme.colors.orb2} 
                style={{ width: 300, height: 300, borderRadius: 150, opacity: 0.5 }} 
                duration={15000} startX={-50} startY={-50} toX={200} toY={100} 
            />
            <Orb 
                color1={theme.colors.orb3} color2={theme.colors.orb2} 
                style={{ width: 250, height: 250, borderRadius: 125, opacity: 0.4 }} 
                duration={18000} startX={width - 100} startY={100} toX={width - 250} toY={300} 
            />
            <Orb 
                color1={theme.colors.orb4} color2={theme.colors.orb5} 
                style={{ width: 200, height: 200, borderRadius: 100, opacity: 0.3 }} 
                duration={22000} startX={width/2 - 100} startY={height - 100} toX={20} toY={height - 250} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: 0,
    },
    bgFilter: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    orb: {
        position: 'absolute',
        zIndex: 1,
        elevation: 0,
    }
});
