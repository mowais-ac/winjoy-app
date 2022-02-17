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
          <WjBackground
            style={{
              height: height * 0.18,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: height * 0.07,
              height: height * 0.15,
              alignItems: 'center',
            }}>
            <View style={{marginBottom: height * 0.01}}>
              <Text style={[styles.headerText]}>Terms And Conditions</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.heading}>Eligibility for Membership</Text>

              <Text style={styles.paragraph}>
                It is critical for Winjoy to guarantee that its members may
                enter into legally binding contracts and that minors do not
                purchase, use, or have access to inappropriate content. Persons
                under the age of 18 are not eligible for membership or usage of
                the Platform (Winjoy Website/ Winjoy App). By using the Platform
                (Winjoy Website/ Winjoy App), You represent and declare that You
                are at least 18 years old and that any information You give
                while registering with the Platform (Winjoy Website/ Winjoy App)
                or submitting information to Us is honest and truthful.
              </Text>

              <Text style={styles.paragraph}>
                Winjoy maintains the right, in its sole discretion, to deny,
                limit, suspend, or revoke any individual's access to the
                Platform (Winjoy Website/ Winjoy App) or membership if Winjoy
                believes that person is under the age of 18 or that any
                information provided is not accurate or honest, or for any other
                reason. Members whose membership has been rejected, limited,
                suspended, or withdrawn by Winjoy are not permitted to utilize
                the Platform (Winjoy Website/ Winjoy App). A person may only
                register as a member of the Platform (Winjoy Website/ Winjoy
                App) once.
              </Text>

              <Text style={styles.heading}>
                Registration and Membership Obligations
              </Text>

              <Text style={styles.paragraph}>
                To use the Services and the Platform (Winjoy Website/ Winjoy
                App), You must first create an account and register information
                with Us in order to create a membership ("Membership"). You
                agree that any information provided to Us in connection with
                this Agreement will be complete and accurate, that You will not
                register under the name of another person, nor will You attempt
                to enter the Membership under the name of another person, and
                that You will not use a username that We, in Our sole
                discretion, deem offensive. We have the right to refuse
                registration if We feel You will not comply with these Terms.
              </Text>

              <Text style={styles.paragraph}>
                You are responsible for keeping Your Membership information up
                to date so that they are always deemed true, accurate, current,
                and full. If You provide any information that is untrue,
                inaccurate, not current, or incomplete, or if Winjoy suspects in
                Our sole discretion that such information is untrue, inaccurate,
                not current, or incomplete, or is not in accordance with this
                User Agreement, We reserve the right to suspend, limit, or
                withdraw Your Membership and/or Your access to the Platform
                (Winjoy Website/ Winjoy App) indefinitely, limit, or withdraw
                Your access to the Platform (Winjoy Website/ Winjoy App).
              </Text>

              <Text style={styles.paragraph}>
                You will be asked to supply certain information and register a
                username and password for usage of the Platform (Winjoy Website/
                Winjoy App) when creating Your account on the Platform (Winjoy
                Website/ Winjoy App) in order to create Your Membership. To keep
                Your account safe, You must protect It with reasonable means,
                and You are solely responsible for maintaining the
                confidentiality of, and restricting access to and use of, Your
                account and password to the Platform (Winjoy Website/ Winjoy
                App) at all times.
              </Text>

              <Text style={styles.paragraph}>
                You agree to take accountability for any and all activities that
                take place under Your account with Us. If someone other than You
                uses Your login details to access the Platform (Winjoy Website/
                Winjoy App), You will be held liable for all acts taken in Your
                name. In the case of termination, You will no longer be
                permitted to access the Platform (Winjoy Website/ Winjoy App) or
                Your Membership, and We retain the right to enforce this
                termination by any means available. You agree to alert Winjoy
                promptly of any unauthorized use of Your Membership or any other
                security violation.
              </Text>

              <Text style={styles.paragraph}>
                You may not use any other person's Membership at any time. You
                undertake to fully compensate Winjoy for all fees, expenditures,
                and damages incurred as a result of improper, unauthorized, or
                unlawful use of Your Membership and password by You or any other
                person gaining access to the Platform (Winjoy Website/ Winjoy
                App). You may not transfer or sell Your Winjoy Membership to
                another person, and You agree that You are entirely liable for
                any Membership activity.
              </Text>

              <Text style={styles.heading}>Electronic Communication</Text>

              <Text style={styles.paragraph}>
                To use the Services and the Platform (Winjoy Website/ Winjoy
                App), You must first register an account and provide personal
                information to Us in order to create a membership
                ("Membership"). You agree that any information provided to Us in
                these areas will be complete and accurate, that You will not
                register under the name of another person, nor will You attempt
                to enter the Membership under the name of another person, and
                that You will not use a username that We, in Our sole
                discretion, deem offensive. We have the right to refuse
                registration if We feel You will not comply with these Terms.
              </Text>

              <Text style={styles.heading}>Conduct</Text>

              <Text style={styles.paragraph}>
                You may not use or use the Platform (Winjoy Website/ Winjoy App)
                or the Services made available via the Platform (Winjoy Website/
                Winjoy App) for any purpose other than the one for which we make
                it available to You. In our sole discretion, we may ban certain
                activity in connection with the Platform (Winjoy Website/ Winjoy
                App) and Services. These forbidden acts include, but are not
                limited to:
              </Text>

              <Text style={styles.paragraph}>
                Fraud, trafficking in obscene content, drug selling, gambling,
                harassment, stalking, spamming, copyright infringement, patent
                infringement, or theft of trade secrets are all examples of
                criminal, delictual, or tortious activities.
              </Text>

              <Text style={styles.paragraph}>
                Engaging in any automated use of the Service, such as sending
                comments or messages using scripts. Interfering with,
                disturbing, or imposing an excessive load on the service or the
                networks or services to which it is linked. Making an attempt to
                imitate another User or person. Using another User's login or
                account. Using any information obtained from the Service to
                harass, abuse, or injure another person. Accepting money of any
                kind from a third party in exchange for doing any commercial
                activity on or via the Service on that person's behalf. Using
                the Service in a way that violates any and all relevant laws and
                regulations.
              </Text>
              <Text style={styles.paragraph}>
                Activities that are harmful, abusive, illegal, threatening,
                harassing, blasphemous, immoral, defamatory, obscene,
                pornographic, paedophilic, libellous, invading another's privacy
                or other rights, hateful, or racially, ethnically objectionable,
                disparaging, relating to, or encouraging money laundering or
                illegal gambling, or harms or could harm minors in any way, or
                otherwise unlawful in any way. Any behavior that harasses,
                degrades, intimidates, or is hostile to any individual or group
                of individuals because of their religion, gender, sexual
                orientation, race, ethnicity, age, or handicap.
              </Text>

              <Text style={styles.paragraph}>
                Any behavior that violates any relevant equal employment
                legislation, including but not limited to those that prohibit
                indicating a preference or requirement in any job posting based
                on the applicant's race, color, religion, sex, national origin,
                age, or handicap. Any action that contains personal or
                identifiable information about another individual without the
                explicit agreement of that person. Any action that impersonates
                a person or entity, including but not limited to a Winjoy
                employee, or falsely declares or otherwise misrepresents an
                association with a person or entity is prohibited.
              </Text>

              <Text style={styles.paragraph}>
                Any conduct that deceives or misleads the recipient regarding
                the origin of such messages, or that sends material that is
                extremely offensive or frightening in character. Furthermore,
                You agree not to:
              </Text>

              <Text style={styles.paragraph}>
                Contact anyone who has requested not to be contacted, or make
                unsolicited contact with anyone for any commercial purpose; use
                automated means, such as spiders, robots, crawlers, data mining
                tools, or the like, to download or scrape data from the Service,
                except for internet search engines (e.g. Google) and
                non-commercial public archives (e.g. archive.org) that comply
                with our robots.txt file;
              </Text>

              <Text style={styles.paragraph}>
                Also, strive to obtain unauthorized access to Winjoy's computer
                systems or participate in any conduct that disrupts, degrades
                the quality of, interferes with the performance of, or affects
                the functioning of the Platform (Winjoy Website/ Winjoy App).
                Any content that You post will be subject to relevant laws and
                may be blocked or investigated in accordance with applicable
                laws. Furthermore, if You are found to be in violation of such
                laws and regulations, we retain the right to cancel Your
                account/block Your access to the Platform (Winjoy Website/
                Winjoy App), or any portion of it, and we reserve the right to
                remove any non-compliant content posted by You.
              </Text>

              <Text style={styles.paragraph}>
                You are completely liable for any repercussions, losses, or
                damages we may incur, directly or indirectly, or suffer as a
                result of Your activity.
              </Text>

              <Text style={styles.heading}>Payment Gateway</Text>
              <Text style={styles.paragraph}>
                If You make a payment for Our Services using our Platform
                (Winjoy Website/ Winjoy App), the information You supply will be
                sent immediately to our payment provider over a secure
                connection. The card holder must keep a copy of the transaction
                records as well as the merchant's policies and restrictions.
                Multiple transactions on the card holder's monthly statement may
                result in multiple postings. The product prices stated per unit
                on Our Platform (Winjoy Website/ Winjoy App) include VAT. Users
                may be charged in AED Dirhams (United Arab Emirates Dirhams) or
                any other currency, depending on where they use the site and the
                type of Credit Card they use. In such circumstances, there may
                be minor differences in values due to fluctuations in foreign
                exchange rates.
              </Text>

              <Text style={styles.heading}>
                Refund &amp; Cancellation Policy
              </Text>
              <Text style={styles.paragraph}>
                All sales are final, with no refunds or exchanges. For any
                defective items, Winjoy will only replace the damaged product,
                subject to any warranties and/or guarantees offered by the
                product's manufacturer. Winjoy shall have no obligation or
                responsibility for any flaw in a Prizeprovided. Other types of
                refunds are not permitted.
              </Text>

              <Text style={styles.heading}>Intellectual Property Rights</Text>
              <Text style={styles.paragraph}>
                The Platform (Winjoy Website/ Winjoy App) and its materials,
                including without limitation, the text, software, scripts,
                graphics, photos, sounds, music, videos, interactive features,
                and the like ("Materials"), as well as the trademarks, service
                marks, and logos contained therein ("Marks"), are owned or
                licensed by Winjoy and are protected by copyright and other
                intellectual property rights under UAE and foreign laws and
                international conventions.
              </Text>

              <Text style={styles.paragraph}>
                The Platform (Winjoy Website/ Winjoy App) may display some
                intellectual property items belonging to third parties in
                conjunction with the Services. The use of these items may be
                subject to licenses given to Winjoy by third parties.
              </Text>

              <Text style={styles.paragraph}>
                In no circumstances will You reverse engineer, decompile, or
                disassemble such products, and nothing contained herein shall be
                deemed to grant You any right in connection to such goods. The
                Platform (Winjoy Website/ Winjoy App)'s materials are provided
                to You AS IS for Your information and personal use only and may
                not be used, copied, reproduced, distributed, transmitted,
                broadcast, displayed, sold, licensed, or otherwise exploited for
                any other purpose without the prior written consent of the
                respective owners.
              </Text>

              <Text style={styles.paragraph}>
                Winjoy maintains all rights to the Platform (Winjoy Website/
                Winjoy App) and the Materials that are not expressly given
                below. You undertake not to use, copy, or distribute any of the
                Materials in any way other than as specifically allowed above,
                including any use, copying, or distribution of Materials
                received from third parties through the Platform (Winjoy
                Website/ Winjoy App) for commercial reasons.
              </Text>

              <Text style={styles.paragraph}>
                You undertake not to circumvent, disable, or otherwise interfere
                with the Platform (Winjoy Website/ Winjoy App)'s security
                mechanisms or those that prohibit or restrict the use or copying
                of any Materials, or to impose limits on the use of the Platform
                (Winjoy Website/ Winjoy App) or the Materials included within.
                Copyright protects content presented on or through the provision
                of services as a collective work and/or compilation under
                copyright laws, other laws, and international treaties.
              </Text>

              <Text style={styles.paragraph}>
                It is explicitly prohibited to reproduce, modify, create
                derivative works from, or redistribute the Platform (Winjoy
                Website/ Winjoy App), the Materials, or the collective work or
                compilation. It is explicitly prohibited to copy or reproduce
                the Platform (Winjoy Website/ Winjoy App), the Materials, or any
                component thereof for future reproduction or redistribution.
              </Text>

              <Text style={styles.heading}>User Submissions</Text>
              <Text style={styles.paragraph}>
                You acknowledge that a variety of things can go wrong when using
                the Platform (Winjoy Website/ Winjoy App) and the Services made
                available through the Platform (Winjoy Website/ Winjoy App). You
                accept full responsibility and accountability for these
                occurrences, and you will have no recourse against Winjoy if
                they occur. When You use the Platform (Winjoy Website/ Winjoy
                App), You will be exposed to Materials from a variety of
                sources, and You agree and assume all liability for Your use, to
                the extent permitted by applicable law. Winjoy is not
                responsible for the accuracy, usefulness, safety, or
                intellectual property rights of or relating to such Materials,
                and You agree and assume all liability for Your use.
              </Text>

              <Text style={styles.paragraph}>
                You may also be exposed to Materials that are inaccurate,
                offensive, indecent, objectionable, defamatory, or libelous,
                and, to the extent permitted by law, You agree to waive, and
                hereby do waive, any legal or equitable rights or remedies You
                have or may have against Winjoy in connection with such
                Materials.
              </Text>

              <Text style={styles.heading}>Digital Media</Text>
              <Text style={styles.paragraph}>
                You agree to the use of Your name if You are the Winner of any
                of the Campaigns. This includes, but is not limited to, the use
                of Your name in local and regional news, on the Platform (Winjoy
                Website/ Winjoy App), and on any social (online) media profile
                linked to Us. You agree that We may use any and all digital
                records generated by Us, including but not limited to images,
                videos, and call recordings of the Prize, the winning phone
                call, and the Prize collection, on the Platform (Winjoy Website/
                Winjoy App) and on any social (online) media profile linked with
                Us. Images and/or audio recordings of the Winner and/or their
                name may be included in these digital records.
              </Text>

              <Text style={styles.heading}>Limitations of Liability</Text>
              <Text style={styles.paragraph}>
                To provide a dependable and entertaining service, bugs must be
                fixed, upgrades must be installed, and general diagnostics and
                maintenance must be performed. We cannot guarantee that the
                Platform (Winjoy Website/ Winjoy App) and Services will always
                be available, uninterrupted, problem-free, omission-free, or
                error-free. To the extent permitted by law, the Platform (Winjoy
                Website/ Winjoy App)'s and Services' content and functionality
                are provided "as is," with no explicit or implied warranties of
                any kind.
              </Text>

              <Text style={styles.paragraph}>
                The Platform (Winjoy Website/ Winjoy App)'s information may not
                always be correct. We rely on data from third parties to offer
                the information featured on the Platform (Winjoy Website/ Winjoy
                App). We work with Our partners to ensure that the data is true
                and up to date, but we cannot promise that it will always be.
              </Text>

              <Text style={styles.paragraph}>
                In no event will Winjoy or any of Our data providers be liable
                for any incidental, indirect, special, punitive, exemplary, or
                consequential damages arising from Your use of or inability to
                use the App, including, but not limited to, loss of revenue or
                anticipated profits, loss of goodwill, loss of business, loss of
                data, computer failure or malfunction, or any other damages.
              </Text>

              <Text style={styles.paragraph}>
                WE EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS,
                EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </Text>

              <Text style={styles.paragraph}>
                In addition to the limitations of warranties set out above, You
                explicitly recognize and agree that any claim you may have
                against Us will be limited to the amount You paid to Us, if any,
                for use of our Platform (Winjoy Website/ Winjoy App) and/or
                Services.
              </Text>

              <Text style={styles.heading}>Indemnity</Text>
              <Text style={styles.paragraph}>
                You agree to defend, indemnify, and hold Winjoy and its
                affiliates and subsidiaries, as well as its and their officers,
                directors, shareholders, successors, assigns, agents, service
                providers, suppliers, and employees, harmless from and against
                any and all claims, damages, obligations, losses (whether
                direct, indirect, or consequential), liabilities, costs or debt,
                and expenses (including but not limited to attorneys' fees)
                arising from: (i)Your violation of any of the terms of this User
                Agreement; (ii) Your violation of any third-party right,
                including, but not limited to, any copyright, trademark, trade
                secret, or other property, or privacy right; (iii) Your use of
                the Platform (Winjoy Website/ Winjoy App) or Service, or (iv)
                any allegation that the Platform (Winjoy Website/ Winjoy App),
                Services, or Materials caused You or a third party harm. This
                responsibility to defend and indemnify shall survive the
                termination, modification, or expiration of this User Agreement
                and Your use of the Service and the Platform (Winjoy Website/
                Winjoy App).
              </Text>

              <Text style={styles.heading}>No Spam Policy</Text>
              <Text style={styles.paragraph}>
                Sending unsolicited email ads or other unsolicited messages to
                Winjoy email addresses or through Winjoy information systems is
                explicitly banned by these Terms.
              </Text>

              <Text style={styles.paragraph}>
                Any unlawful use of Winjoy computer systems is a violation of
                this User Agreement as well as several applicable laws, most
                notably the UAE Cybercrime legislation. Such infractions may
                result in civil and criminal fines for the sender and his or her
                representatives. Please keep in mind that the UAE Cybercrime Act
                entails severe penalties, including prison.
              </Text>

              <Text style={styles.paragraph}>
                If You plan to solicit or contact Our Users by acquiring their
                email or phone numbers via Our Platform (Winjoy Website/ Winjoy
                App), we may report this activity to the appropriate
                authorities, who may then elect to punish You under UAE law.
              </Text>

              <Text style={styles.heading}>
                Limitation and Termination of Service
              </Text>
              <Text style={styles.paragraph}>
                Winjoy reserves the right to impose limits on your use of the
                Service at any time, including the maximum number of days that
                content will be maintained or retained by the Service, the
                maximum number and size of postings, e-mail messages, or other
                Content that the Service may transmit or store, and the
                frequency with which You may access the Service or the Platform
                (Winjoy Website/ Winjoy App).
              </Text>

              <Text style={styles.paragraph}>
                Winjoy retains the right, with or without notice, to change or
                terminate the Service on the Platform (Winjoy Website/ Winjoy
                App) (or any part thereof), and Winjoy shall not be responsible
                to You or any third party for any such modification, suspension,
                or discontinuance of the Service.
              </Text>

              <Text style={styles.paragraph}>
                You acknowledge and agree that Winjoy has the right (but not the
                obligation) to delete or deactivate Your account, block Your
                e-mail or IP address, or otherwise terminate Your access to or
                use of the Service or Platform (Winjoy Website/ Winjoy App) (or
                any part thereof) immediately and without notice for any reason
                or no reason at all. Furthermore, You agree that Winjoy will not
                be responsible to You or any other person in the event that Your
                access to the Platform (Winjoy Website/ Winjoy App) or the
                Service is terminated.
              </Text>

              <Text style={styles.heading}>Assignment</Text>
              <Text style={styles.paragraph}>
                You may not transfer or assign these Terms or any rights or
                licenses granted hereunder, but Winjoy may do so without
                limitation. Any assignment or transfer made by You is invalid.
              </Text>

              <Text style={styles.heading}>General Information</Text>
              <Text style={styles.paragraph}>
                Winjoy's omission to assert or enforce any right or term of this
                User Agreement shall not be construed as a waiver of such right
                or provision.
              </Text>

              <Text style={styles.paragraph}>
                If a court of competent jurisdiction finds any provision of this
                User Agreement to be invalid (including, without limitation,
                because such provision is inconsistent with the laws of another
                jurisdiction) or inapplicable, We and You agree that the court
                should endeavor to give effect to Our intentions as reflected in
                this User Agreement.
              </Text>

              <Text style={styles.paragraph}>
                If any term or sections of this User Agreement are found to be
                invalid, unlawful, or unenforceable, the validity, legality, and
                enforceability of the other elements of this User Agreement will
                not be altered or damaged in any manner.
              </Text>

              <Text style={styles.paragraph}>
                YOU AGREE THAT ANY CAUSE OF ACTION BROUGHT BY YOU AND ARISING
                OUT OF OR RELATED TO YOUR USE OF THE SERVICE AND/OR THE PLATFORM
                (WINJOY WEBSITE/ WINJOY APP) MUST BE STARTED WITHIN A REASONABLE
                TIME AND, IN ANY EVENT, WITHIN ONE (1) YEAR AFTER THE CAUSE OF
                ACTION ACCRUES.
              </Text>

              <Text style={styles.heading}>
                Governing law and Dispute Resolution
              </Text>
              <Text style={styles.paragraph}>
                Any dispute arising out of or in connection with this User
                Agreement, including any question about its existence, validity,
                or termination, shall be subject to the exclusive jurisdiction
                of the Dubai International Financial Centre's Courts. The laws
                of the Dubai International Financial Centre will govern and be
                construed in conformity with this Agreement.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
