import Collection from './Collection';
import Product from './Product';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Collection: { screen: Collection },
    Product: { screen: Product }
},
{
    initialRouteName: 'Collection',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff" ,        
        }
    }
}
);

const Main = createAppContainer(MenuNavigator);

  export default Main;
