/**
 * Componente de view
 */
import React from 'react';
import { View } from 'react-native';

type ViewProps = {
    children?: any;
    style?: any;
};

const Component: React.FC<ViewProps> = ({ children, style }) => (
    <View style={style}>{ children }</View>
);

export default Component; 