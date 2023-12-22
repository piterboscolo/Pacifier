import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const intervalId = setInterval(() => {
      // Simulação: gerar batimentos cardíacos aleatórios entre 60 e 120
      const randomHeartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
      setHeartRate(randomHeartRate);

      if (randomHeartRate > 135) {
        // Chame a função para acionar a música na Alexa ou dispositivo de música
        playMusic();
      }
    }, 5000); // A cada 5 segundos (ajuste conforme necessário)

    return () => {
      clearInterval(intervalId);
      BleManager.stopScan();
    };
  }, []);

  const playMusic = () => {
    // Adicione aqui a lógica para acionar a música na Alexa ou dispositivo de música
    // Pode envolver integração com APIs específicas ou SDKs.
    console.log('Batimentos cardíacos acima do limite. Tocar música.');
  };

  return (
    <View>
      <Text>Heart Rate: {heartRate}</Text>
      <Button title="Start Scan" onPress={() => BleManager.scan([], 10, true)} />
    </View>
  );
};

export default App;
