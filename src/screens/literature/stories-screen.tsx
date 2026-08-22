import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import GetImage from '@/components/get-image';
import ColorBox from '@/components/layout/color-box';
import PageCard from '@/components/layout/page-card';
import images from '@/data/list_file.json';

const seenTitles = new Set<string>();
const stories = Object.entries(images).map(([key, story]) => {
  const showHeading = !seenTitles.has(story.imgtitle);
  seenTitles.add(story.imgtitle);
  return { key, ...story, showHeading };
});

export default function StoriesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageCard header="RARR Stories">
        <View style={styles.stack}>
          {stories.map((story) => (
            <ColorBox key={story.key}>
              {story.showHeading && (
                <Text variant="titleLarge" style={styles.title}>
                  {story.imgtitle}
                </Text>
              )}
              <GetImage wide={story.wide} imgPath={story.imgfile} altText={story.imgtitle} />
            </ColorBox>
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
    gap: 16,
    alignItems: 'center',
    padding: 8,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
