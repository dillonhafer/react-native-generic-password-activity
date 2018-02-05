import PropTypes from 'prop-types';

import React, { PureComponent } from 'react';
import { Clipboard, Platform, Share, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconName = Platform.OS === 'ios' ? 'ios-contact' : 'md-contact';
const passwordIconName = Platform.OS === 'ios' ? 'ios-lock' : 'md-lock';

class GenericPasswordExtension extends PureComponent {
  onPress = async () => {
    await openShareModal(this.props.domain);
    const val = await Clipboard.getString();
    await Clipboard.setString('');
    this.props.onPress(val);
  };

  render() {
    const platformIcon =
      this.props.type === 'password' ? passwordIconName : iconName;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Ionicons
          style={{
            width: 33,
            paddingHorizontal: 5,
            textAlign: 'center',
            ...(this.props.style || {}),
          }}
          name={this.props.iconName || platformIcon}
          size={this.props.iconSize || 28}
          color={this.props.color}
        />
      </TouchableOpacity>
    );
  }
}

const openShareModal = domain => {
  return Share.share(
    {
      title: 'Choose a Password Manager',
      url: `https://${domain}`,
    },
    {
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToFacebook',
        'com.apple.UIKit.activity.PostToTwitter',
        'com.apple.UIKit.activity.PostToWeibo',
        'com.apple.UIKit.activity.Message',
        'com.apple.UIKit.activity.Mail',
        'com.apple.UIKit.activity.Print',
        'com.apple.UIKit.activity.CopyToPasteboard',
        'com.apple.UIKit.activity.AssignToContact',
        'com.apple.UIKit.activity.SaveToCameraRoll',
        'com.apple.UIKit.activity.AddToReadingList',
        'com.apple.UIKit.activity.PostToFlickr',
        'com.apple.UIKit.activity.PostToVimeo',
        'com.apple.UIKit.activity.PostToTencentWeibo',
        'com.apple.UIKit.activity.AirDrop',
        'com.apple.UIKit.activity.OpenInIBooks',
        'com.apple.UIKit.activity.MarkupAsPDF',
        'com.apple.reminders.RemindersEditorExtension', //Reminders
        'com.apple.mobilenotes.SharingExtension', // Notes
        'com.apple.mobileslideshow.StreamShareService', // iCloud Photo Sharing - This also does nothing :{
        'com.linkedin.LinkedIn.ShareExtension', //LinkedIn
        'pinterest.ShareExtension', //Pinterest
        'com.google.GooglePlus.ShareExtension', //Google +
        'com.tumblr.tumblr.Share-With-Tumblr', //Tumblr
        'wefwef.YammerShare', //Yammer
        'com.hootsuite.hootsuite.HootsuiteShareExt', //HootSuite
        'net.naan.TwitterFonPro.ShareExtension-Pro', //Echofon
        'com.hootsuite.hootsuite.HootsuiteShareExt', //HootSuite
        'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
      ],
    },
  );
};

GenericPasswordExtension.propTypes = {
  domain: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  type: PropTypes.oneOf(['username', 'password']).isRequired,
  style: PropTypes.object,
};

export default GenericPasswordExtension;
