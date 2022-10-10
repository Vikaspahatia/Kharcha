import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
const CategoryDetailScreen = props =>{
    const itemId = props.navigation.getParam('itemId');
    const items = useSelector(state => state.items.availableItems)
    const displayedItem = items.find(item => item.id ===itemId);
    return (
        <ScrollView>
            <View >
                <Text>{displayedItem.title}</Text>
                <Text>{displayedItem.description}</Text>
            </View>
            <View>
                <Text>{displayedItem.price}</Text>
                <Text>{displayedItem.date}</Text>
            </View>
        </ScrollView>
    )
};
CategoryDetailScreen.navigationOptions =navData => {
    const itemTitle = navData.navigation.getParam('itemTitle');
    
    return {
        headerTitle:itemTitle
    }
};
const styles = StyleSheet.create({

});

export default CategoryDetailScreen;