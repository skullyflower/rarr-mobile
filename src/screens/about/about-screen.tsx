import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import GetImage from '@/components/get-image';
import AccordionSection from '@/components/layout/accordion-section';
import ColorBox from '@/components/layout/color-box';
import InlineHtmlText from '@/components/layout/inline-html-text';
import PageCard from '@/components/layout/page-card';
import about from '@/data/about.json';

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header={about.pageText.title}>
        <View style={styles.stack}>
          <ColorBox>
            <Text variant="titleMedium" style={styles.subTitle}>
              {about.pageText.subTitle}
            </Text>
            {about.aboutText.map((line, i) => (
              <Text key={`about-p-${i}`} style={styles.paragraph}>
                {line}
              </Text>
            ))}
          </ColorBox>

          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Questions and Answers
          </Text>
          <View style={styles.stack}>
            {about.faqs.map((faq, i) => (
              <AccordionSection key={`faq-${i}`} title={faq.Q}>
                <View style={styles.faqStack}>
                  {i === 0 && (
                    <View style={styles.faqRow}>
                      <GetImage maxWidth={140} imgPath="WDYT.gif" altText="What do you think?" />
                      <InlineHtmlText html={faq.A} style={styles.faqText} />
                    </View>
                  )}
                  {i !== 0 && <InlineHtmlText html={faq.A} />}
                  {i === 0 && <GetImage wide imgPath="fittingIn.jpg" altText="Can never fit in." />}
                </View>
              </AccordionSection>
            ))}
          </View>

          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Disclaimer
          </Text>
          {about.disclaimer.map((p, i) => (
            <Text key={`one-b-d-${i}`} variant="bodySmall">
              {p}
            </Text>
          ))}
        </View>
      </PageCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  stack: {
    gap: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  faqStack: {
    gap: 8,
    alignItems: 'center',
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  faqText: {
    flex: 1,
  },
});
