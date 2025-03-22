import { View, StyleSheet, FlatList } from "react-native";
import AnimatedRadioButtons from "./components/radio-buttons/radio-buttons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Spinner, useTheme } from '@ui-kitten/components';
import Animated, { FadeInUp, useAnimatedRef } from 'react-native-reanimated';
import { useFetchQuestions } from "./hooks/use-fetch-questions";
import { useSendAnswers } from "./hooks/use-send-answers";
import { useRouter } from "expo-router";
import { SubmitAnswersBtn } from "./components/submit-answers-btn/submit-answers-btn";

export default function Index() {

  const router = useRouter();
  const animatedRef = useAnimatedRef<FlatList>();
  const [optionsSelected, setOptionsSelected] = useState<{ [key: string]: string }>({})
  const { questionsData, questionsLoading } = useFetchQuestions();
  const { sendAnswers, isLoading: isSendAnswersLoading } = useSendAnswers({
    onSuccess: () => {
      router.push('/success-message')
    }
  });

  const isSelected = useCallback((questionId: string) => {
    return optionsSelected[questionId]
  }, [optionsSelected]);

  const handleOptionSelected = useCallback((questionId: string, optionId: string) => {
    setOptionsSelected((prev) => ({
      ...prev,
      [questionId]: optionId
    }))
  }, [setOptionsSelected]);

  const isVisible = useCallback((questionId: string) => {
    if (questionsData === undefined) {
      return false
    }

    const questionIndex = questionsData?.findIndex((question) => question.id === questionId);
    if (questionIndex === undefined) {
      return false
    }

    if (questionIndex === 0) {
      return true
    }

    const previousQuestionId = questionsData[questionIndex - 1].id;
    return optionsSelected[previousQuestionId] !== undefined
  }, [optionsSelected, questionsData]);

  const questionsVisible = useMemo(() => questionsData?.filter((question) => isVisible(question.id)), [questionsData, isVisible]);
  const allQuestionsAnswered = useMemo(() => questionsData?.every((question) => optionsSelected[question.id] !== undefined), [questionsData, optionsSelected]);

  useEffect(() => {
    if (allQuestionsAnswered) {
      animatedRef.current?.scrollToEnd()
    }
  }, [allQuestionsAnswered])

  return (
    <View
      style={styles.ctr}
    >
      {
        (questionsLoading || isSendAnswersLoading) ? (
          <View
            style={styles.spinnerCtr}
          >
            <Spinner
            />
          </View>
        ) : (
          <Animated.FlatList
            data={questionsVisible}
            ref={animatedRef}
            style={styles.flatlist}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInUp}
              >
                <AnimatedRadioButtons
                  key={item.id}
                  id={item.id}
                  label={item.question}
                  options={item.options}
                  selected={isSelected(item.id)}
                  onChange={(optionId) => handleOptionSelected(item.id, optionId)}
                />
              </Animated.View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.gap} />}
            ListFooterComponent={
              allQuestionsAnswered ?
                <Animated.View
                  entering={FadeInUp}
                >
                  <View style={styles.gap} />
                  <SubmitAnswersBtn
                    handleSubmit={() => sendAnswers(optionsSelected)}
                  />
                  <View style={styles.gap} />
                </Animated.View> : null}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ctr: {
    display: 'flex',
  },
  gap: {
    height: 16
  },
  flatlist: {
    padding: 32
  },
  spinnerCtr: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});




