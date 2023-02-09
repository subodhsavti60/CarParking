import React from 'react';
import {View, StatusBar, SafeAreaView, Text, StyleSheet,Dimensions} from 'react-native';
import {Overlay, Icon} from 'react-native-elements';

const CustomModal = (props: any) => {
  const {
    isVisible,
    closeOverlay,
    customStyle = {},
    headerViewCustomStyle = {},
    headerCustomTitle = {},
    headerTitle = '',
    showHeader_Icon = false,
    isFullscreen = false,
    headerIconColor = '',
    headerIconSize = 0,
    overlayMainView = {},
    backdropCustomStyle = {},
  } = props;
  /**-------------Method to close the details modal---------------- */
  const toggleOverlay = () => {
    closeOverlay(false);
  };

  return (
    <Overlay
      isVisible={isVisible}
      fullScreen={false}
      animationType={'slide'}
      onBackdropPress={toggleOverlay}
      backdropStyle={backdropCustomStyle}
      statusBarTranslucent={true}
      overlayStyle={customStyle}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={false}
          // backgroundColor={COLOR.Black}
          barStyle="dark-content"
        />
        <View style={[{flex: 1}, overlayMainView]}>
          {showHeader_Icon && (
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headerViewStyle, headerViewCustomStyle]}>
                <Text style={[styles.headerTitleStyle, headerCustomTitle]}>
                  {headerTitle}
                </Text>
              </View>
              <View style={{flex: 0.12}}>
                <Icon
                  name={'close-outline'}
                  type={'ionicon'}
                  size={headerIconSize ? headerIconSize : 50}
                  color={headerIconColor ? headerIconColor : 'black'}
                  onPress={toggleOverlay}
                  tvParallaxProperties={undefined}
                />
              </View>
            </View>
          )}
          {props.children}
        </View>
      </SafeAreaView>
    </Overlay>
  );
};

CustomModal.defaultProps = {
  isVisible: false,
  closeOverlay: () => {},
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 22,
    color: 'black',
    fontWeight:'bold',
    marginLeft: Dimensions.get('window') * 0.12,
  },
  headerViewStyle: {
    flex: 0.88,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
