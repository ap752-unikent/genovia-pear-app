import { Stack } from "expo-router";
import MedexpressLogo from "./components/medexpress-logo/medexpress-logo";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry} from "@ui-kitten/components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View } from "react-native";

export default function RootLayout() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <Stack
          screenOptions={{ headerTitle: () => 
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <MedexpressLogo />
          </View>,
          headerBackVisible: false }}
        />
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
