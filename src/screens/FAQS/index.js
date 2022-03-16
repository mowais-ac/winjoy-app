import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  TopTab,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const [headerValue, setHeaderValue] = useState(0);
  const [selected, setSelected] = useState(0);
  useEffect(() => {}, []);

  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}
        style={{flex: 1}}>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <ScrollView
          onScroll={e => {
            setHeaderValue(e.nativeEvent.contentOffset.y);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#420E92', '#E7003F']}
            style={{
              height: 'auto',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <View
              style={{marginVertical: 10, alignItems: 'center', marginTop: 50}}>
              <Text style={[styles.headerText]}>FAQS</Text>
            </View>
          </LinearGradient>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.heading}>What is Winjoy?</Text>
              <Text style={styles.paragraph}>
                Winjoy is UAE’s first live mobile game show that enables you to
                win exciting prizes by answering simple questions. Join and win
                daily prizes by freely participating in the live show.
              </Text>

              <Text style={styles.heading}>Is it free to play?</Text>
              <Text style={styles.paragraph}>Yes, it’s frree to play.</Text>

              <Text style={styles.heading}>When can I play?</Text>
              <Text style={styles.paragraph}>We go live everyday at 8 PM.</Text>

              <Text style={styles.heading}>How Do I Play?</Text>
              <Text style={styles.paragraph}>
                Check out our How To Play video for rules, tips, and help.
              </Text>

              <Text style={styles.heading}>What is the Daily Prize?</Text>
              <Text style={styles.paragraph}>
                The Daily Prize is the cash prize you receive after you have
                successfully completed the first round. The first round consists
                of 10 questions. The total Daily Prize amount is divided equally
                among players that successfully complete this round.
              </Text>

              <Text style={styles.heading}>What is JACKPOT PRIZE?</Text>
              <Text style={styles.paragraph}>
                The Jackpot Prize is the AED 100,000 cash prize you receive
                after you answer all the 10 questions correctly for the Jackpot
                show. The total Jackpot Prize amount is divided equally among
                the winners of the Power Round.
              </Text>

              <Text style={styles.heading}>What are lives?</Text>
              <Text style={styles.paragraph}>
                Lives are your saving grace, your in-game trivia life support
                that helps you progress further. Lives allow players to save
                themselves from being eliminated, if a player answers a question
                incorrectly, they can choose to use a life, this gives the
                player the opportunity to continue participating in the trivia
                further until Question 5.
              </Text>

              <Text style={styles.heading}>How do I earn lives?</Text>
              <Text style={styles.paragraph}>
                Lives can be earned in the following methods{'\n'}1. Referrals
                {'\n'}2. Outright Purchase of lives {'\n'}3. Watching free ads
              </Text>

              <Text style={styles.heading}>
                How does the referral system work?
              </Text>
              <Text style={styles.paragraph}>
                For every 1 referral you make you earn 1 life, for every 5
                referrals made, you earn 10 lives! Effort meets reward on the
                winjoy app in all corners.
              </Text>

              <Text style={styles.heading}>
                Is there an age limit on who can participate in the game shows
                on the winjoy app?
              </Text>
              <Text style={styles.paragraph}>
                18+ years Residents of UAE and GCC.
              </Text>

              <Text style={styles.heading}>
                How does purchasing a product really benefit me?
              </Text>
              <Text style={styles.paragraph}>
                We know this must be one of the burning questions related to
                shopping on our app. To explain this in the most understandable
                way, every product purchase that has been made on our app gets
                entered into a prize draw relative to that particular offer. If
                your purchase a merch, the prize relative to that purchase is
                shown, so in relativity you will be entered into that prize draw
                only. s Residents of UAE and GCC.
              </Text>
              <Text style={styles.heading}>
                What happens if I lose my internet connection?
              </Text>
              <Text style={styles.paragraph}>
                You should only play Winjoy if you have a strong and stable
                internet connection. If you do get disconnected, our system will
                attempt to reconnect you multiple times but if it is unable to
                establish a link, your game will be over. Unfortunately, we
                cannot be responsible if your connection breaks during a quiz.
              </Text>
              <Text style={styles.heading}>What is Deals joy</Text>
              <Text style={styles.paragraph}>
                Deals joy lets you shop for products and win amazing prizes. For
                every purchase made, Winjoy gives its customers a complimentary
                Prize Draw ticket where they can win a luxury prize.
              </Text>
              <Text style={styles.heading}>How does it work?</Text>
              <Text style={styles.paragraph}>
                We run ‘campaigns’, which is the term we use for our prize
                draws. On our app, you’ll see each campaign shown clearly as a
                product/prize combo. When you buy a product, you get a ticket to
                enter the draw to win a particular luxury prize. Once the target
                number of products are sold, the draw takes place and a winner
                is announced!
              </Text>

              <Text style={styles.heading}>Where is winjoy located? </Text>
              <Text style={styles.paragraph}>
                Winjoy is headquartered in Dubai, UAE. We are duly registered
                and regulated by Dubai Government. Account
              </Text>
              <Text style={styles.heading}>
                Why should I register an account with WinJoy?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To complete a purchase with WinJoy you must have a registered
                account. This is for your security and protection.
              </Text>
              <Text style={styles.heading}>
                How do I set up my Winjoy account?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To create an account simply click ‘Login/Register’ in the top
                right hand corner of your screen and enter your details in the
                fields highlighted.
              </Text>
              <Text style={styles.heading}>
                How do I edit my Winjoy account?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To edit your account, click on your name/photo icon located in
                the main menu. Tap profile section to edit and click 'Save
                changes' to complete. Can I use someone else’s credit card in my
                winjoy account to complete a purchase?{' '}
              </Text>
              <Text style={styles.paragraph}>
                If you have the card holder’s permission, you can use/save any
                credit card to complete your purchase.
              </Text>
              <Text style={styles.heading}>
                How do I ‘Logout’ of my Winjoy account?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To ‘Logout’ simply click on your name/photo in the top right
                hand corner and select ‘Logout’ from the drop-down menu.
              </Text>
              <Text style={styles.heading}>
                Will I receive ‘push notifications’ if I ‘Logout’?{' '}
              </Text>
              <Text style={styles.paragraph}>
                You will receive only general notifications when logged out, to
                receive account related information you must ‘Login’.
              </Text>
              <Text style={styles.heading}>
                I can’t remember my Winjoy account password!{' '}
              </Text>
              <Text style={styles.paragraph}>
                At ‘Login’ select ‘Forgot Password’ and follow the on-screen
                instructions for password reset. I want to change my password!
                To change your password, click on your name/photo in the top
                right hand corner and select ‘My Account’. From here select the
                ‘Account’ tab to change your password.
              </Text>
              <Text style={styles.heading}>
                What Credit Cards does Winjoy accept? Winjoy accepts all major
                credit/debits cards including (but not limited to):
                Visa,MasterCard and Amex.
              </Text>
              <Text style={styles.heading}>
                How do I close my Winjoy account?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To close your account you must notify us in writing (from your
                registered email account) at: support@winjoy.ae. Hereafter, a
                dedicated member of our support team will assist you within 48
                hrs.
              </Text>
              <Text style={styles.heading}>
                Why am I receiving ‘push notifications’/emails from Winjoy?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Winjoy is not in the business of spamming or bombarding its
                users with irrelevant ‘push notifications’/emails. Any notices
                sent by Winjoy have been deemed relevant to your user
                experience.
              </Text>
              <Text style={styles.heading}>
                Campaigns How frequently do new Winjoy campaigns emerge?{' '}
              </Text>
              <Text style={styles.paragraph}>
                New campaigns are created instantly at the close of an existing
                campaign. There is no set time limit per campaign, however, you
                can expect new campaigns to emerge frequently. Making a Purchase
                Are there any hidden charges I should be aware of? There are no
                hidden charges on any Winjoy purchases. You should however CHECK
                with your bank to see if they apply any transaction/processing
                fees.
              </Text>
              <Text style={styles.heading}>Will I be charged VAT? </Text>
              <Text style={styles.paragraph}>
                Yes! As of January 1st, 2018 all purchases incur 5% VAT. What
                currencies can I use to purchase an Winjoy product? Winjoy
                currently only accepts Dirhams and US Dollars. You can make a
                purchase from Winjoy via any bank account with any currency -
                however, Winjoy will not accept responsibility for final
                billings which have been affected by exchange rates or fees
                (hidden or otherwise) as imposed by your branch.
              </Text>
              <Text style={styles.heading}>
                Can I cancel/refund an Winjoy purchase order?
              </Text>
              <Text style={styles.paragraph}>
                As per the ‘User Agreement’ all sales purchases are final and no
                refunds are given under any circumstances.
              </Text>
              <Text style={styles.heading}>Can I pay in installments? </Text>
              <Text style={styles.paragraph}>
                Payment via instalments is a feature we will be adding very
                soon, please stay tuned for updates.
              </Text>
              <Text style={styles.heading}>
                Winjoy Products Where can I collect my Winjoy products?{' '}
              </Text>
              <Text style={styles.paragraph}>
                All Winjoy products can be collected directly from Winjoy HQ,
                please read the ‘User Agreement’ prior to making/collecting a
                purchase.
              </Text>
              <Text style={styles.heading}>
                Can I send someone else to collect my Winjoy products?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Only the registered account holder, or (and at our discretion),
                any individual with ‘Power of Attorney’ (POA) can collect the
                registered account holders’ Winjoy purchase. Emirates ID or
                passport are the only acceptable forms of identification (please
                ensure your identification is up to date). Winjoy Prizes
              </Text>
              <Text style={styles.heading}>
                How do I check who wins a campaign?{' '}
              </Text>
              <Text style={styles.paragraph}>
                To find out who wins a campaign you've entered into, you can
                either check the 'winners'section, or you'll get a push
                notification through our app. If you win (fingers crossed!),
                we'll be in touch right away using your registered contact
                details.
              </Text>
              <Text style={styles.heading}>
                Where can I collect my Winjoy prize?{' '}
              </Text>
              <Text style={styles.paragraph}>
                You have a couple of options to choose from! You can either pick
                up your item for free, or we deliver it to you for a small fee.
                Choose whichever method suits you best.
              </Text>
              <Text style={styles.heading}>
                How do I receive my purchased product?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Details on where to collect your prize will be sent to you (aka
                the 'winner') via email. For full details please refer to the
                'Draw Terms & Conditions'
              </Text>
              <Text style={styles.heading}>
                Can I send someone else to collect my Prize?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Only the registered account holder, or (and at our discretion),
                any individual with ‘Power of Attorney’ (POA) can collect the
                registered account holders’ Winjoy Prize. Emirates ID or
                passport are the only acceptable forms of identification (please
                ensure your identification is up to date).
              </Text>
              <Text style={styles.heading}>
                What if I don’t want people to know I’ve won the Winjoy prize
                draw?{' '}
              </Text>
              <Text style={styles.paragraph}>
                As per the ‘Draw Terms & Conditions', Winjoy has the right to
                use your image, name and any statements made across their
                marketing channels (physical/digital).
              </Text>
              <Text style={styles.heading}>
                Can I view past winners of the Winjoy campaign draws?{' '}
              </Text>
              <Text style={styles.paragraph}>
                You will be able to view past winners of Winjoy campaigns via
                our social media channels and our “Winners” segment.
              </Text>
              <Text style={styles.heading}>
                How will I be notified about the status of the campaign: 'Coming
                Soon'/'Launched'/'Ending'/'Closed'?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Winjoy will send ‘Push Notifications’/emails to notify all
                ticket holders as to the status of each campaign.
              </Text>

              <Text style={styles.heading}>Security</Text>
              <Text style={styles.heading}>
                Are my personal details secure with Winjoy?{' '}
              </Text>
              <Text style={styles.paragraph}>
                Winjoy does not store nor save any sensitive Credit Card
                information on its servers. Credit Card details that are
                registered with us are stored securely through the ‘Checkout’
                secure online payment gateway.
              </Text>
              <Text style={styles.heading}>Need to ask us something? </Text>
              <Text style={styles.paragraph}>
                If you have any inquiries related to any aspect of your Winjoy
                experience, please open the Main Menu and select ‘Contact Us’
                from the list. From here you can select to phone/email us with
                any questions you may have.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
