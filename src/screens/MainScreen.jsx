import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import { useAppContext } from '../Context/Context';
import Config from 'react-native-config';
import CartModal from '../components/cartModal';

const MainScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { products } = useAppContext();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const price = cartItems.reduce((acc, item) => {
            const itemPrice = item.productVariant?.mrp ? item.productVariant.mrp * item.quantity : 0;
            return acc + itemPrice;
        }, 0);
        setTotalPrice(price);

        setModalVisible(cartItems.length > 0);
    }, [cartItems]);

    const handleAddToCart = useCallback((product) => {
        dispatch(addToCart(product));
        console.log(`Added ${product.name} to cart.`);
    }, [dispatch]);

    const handleRemoveFromCart = useCallback((productId) => {
        dispatch(removeFromCart(productId));
        console.log(`Removed product with ID ${productId} from cart.`);
    }, [dispatch]);

    const handleUpdateQuantity = useCallback((productId, quantity) => {
        dispatch(updateQuantity(productId, quantity));
        console.log(`Updated quantity of product ID ${productId} to ${quantity}.`);
    }, [dispatch]);

    const addQuantity = useCallback((product) => {
        console.log(`Trying to add quantity for ${product.name}`);
        const productInCart = cartItems.find(cartItem => cartItem.product._id === product._id);
        if (productInCart) {
            handleUpdateQuantity(product._id, productInCart.quantity + 1);
        } else {
            handleAddToCart(product);
        }
    }, [cartItems, handleUpdateQuantity, handleAddToCart]);

    const reduceQuantity = useCallback((product) => {
        console.log(`Trying to reduce quantity for ${product.name}`);
        const productInCart = cartItems.find(cartItem => cartItem.product._id === product._id);
        if (productInCart && productInCart.quantity > 1) {
            handleUpdateQuantity(product._id, productInCart.quantity - 1);
        } else if (productInCart && productInCart.quantity === 1) {
            handleRemoveFromCart(product._id);
        }
    }, [cartItems, handleUpdateQuantity, handleRemoveFromCart]);

    const renderItem = useCallback(({ item }) => {
        const imageUrl = item.productVariant?.images?.length > 0
            ? `${Config.IMAGE_SRC_URL}/${item.productVariant.images[0].path}`
            : null;

        const productInCart = cartItems.find(cartItem => cartItem.product._id === item._id);
        const currentQuantity = productInCart ? productInCart.quantity : 0;

        return (
            <View style={styles.itemContainer}>
                <View style={styles.productBox}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.productImage} />
                    ) : (
                        <Text>No Image</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        {currentQuantity > 0 ? (
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => reduceQuantity(item)}>
                                    <Text style={styles.counterButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{currentQuantity}</Text>
                                <TouchableOpacity onPress={() => addQuantity(item)}>
                                    <Text style={styles.counterButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => addQuantity(item)}>
                                <View style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+ Add</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Text style={styles.productName} numberOfLines={2}>{item.product.name}</Text>
                <Text style={styles.productPrice}>₹{(item.productVariant?.mrp / 100)?.toFixed(2) || 'N/A'}</Text>
                <Text style={styles.packSize}>{item.productVariant?.formattedPacksize || 'N/A'}</Text>
            </View>
        );
    }, [cartItems, addQuantity, reduceQuantity]);

    const keyExtractor = useCallback((item) => item._id || item.product._id, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={renderItem}
            />
            {modalVisible && <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.cartInfo}>
                        <Text style={styles.cartText}>
                            {cartItems.length} Items • ₹{totalPrice.toFixed(2)}
                        </Text>
                        <Text style={styles.extraCharges}>Extra charges may apply</Text>
                    </View>
                    <TouchableOpacity style={styles.viewCartButton}>
                        <Text style={styles.viewCartText}>View cart</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    itemContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#003f6f',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cartInfo: {
        flexDirection: 'column',
    },
    cartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    extraCharges: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
    viewCartButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    viewCartText: {
        color: '#003f6f',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productBox: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        position: 'relative',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
        textAlign: 'left',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
        textAlign: 'left',
    },
    packSize: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'left',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -20,
        width: '100%',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: '#000',
        borderWidth: 0.5,
    },
    addButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#007aff',
        borderRadius: 5,
        width: 100,
        padding: 5,
    },
    counterButton: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal: 10,
    },
    quantityText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MainScreen;
