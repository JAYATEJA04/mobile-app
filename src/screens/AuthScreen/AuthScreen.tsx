import axios from 'axios';
import React, {FC, useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import WebView from 'react-native-webview';
import {githubConfig} from '../../../config/config.sample';
import {urls} from '../../constants/appConstant/url';
import {AuthContext} from '../../context/AuthContext';
import RootContext from '../../context/RootContext';
import Strings from '../../i18n/en';
import {AuthViewStyle} from './styles';
import {getUserData} from './Util';

const AuthScreen = () => {
  const {setLoggedInUserData, setIsLoading} = useContext(AuthContext);
  const [githubView, setGithubView] = useState(false);

  const handleSignIn = () => {
    setGithubView(true);
  };

  if (githubView) {
    return (
      <ScrollView contentContainerStyle={AuthViewStyle.container}>
        <WebView
          onNavigationStateChange={({url}) => {
            getUserData(url)
              .then(res => setLoggedInUserData(res))
              .catch(() => setLoggedInUserData(null));
          }}
          style={AuthViewStyle.webViewStyles}
          source={{
            uri: urls.GITHUB_AUTH,
          }}
        />
      </ScrollView>
    );
  }
  return (
    <ScrollView contentContainerStyle={AuthViewStyle.container}>
      <View style={[AuthViewStyle.imageContainer]}>
        <Image
          source={require('../../../assets/rdsLogo.png')}
          style={AuthViewStyle.logo}
        />
      </View>
      <View style={[AuthViewStyle.constContainer]}>
        <Text style={AuthViewStyle.welcomeMsg}>{Strings.WELCOME_TO}</Text>
        <Text style={AuthViewStyle.cmpnyName}>{Strings.REAL_DEV_SQUAD}</Text>
      </View>
      <View style={AuthViewStyle.btnContainer}>
        <TouchableOpacity onPress={handleSignIn} style={AuthViewStyle.btnView}>
          <View style={AuthViewStyle.githubLogo}>
            <Image source={require('../../../assets/github_logo.png')} />
          </View>
          <View style={AuthViewStyle.signInTxtView}>
            <Text style={AuthViewStyle.signInText}>
              {Strings.SIGN_IN_BUTTON_TEXT}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AuthScreen;
