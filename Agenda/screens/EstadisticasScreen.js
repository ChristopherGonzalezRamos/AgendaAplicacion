import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function EstadisticasScreen() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://192.168.0.15/agenda/get_estadistica.php');
      if (response.data.status === 'success') {
        setStatistics(response.data);
      } else {
        console.error('Error fetching statistics:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStatistics();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const barData = {
    labels: ['Notas Hoy', 'Notas Última Semana'],
    datasets: [
      {
        data: [statistics.notes_today, statistics.notes_last_week],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estadísticas de Notas</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          width={300}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          fromZero={true}
          showValuesOnTopOfBars={true}
          yAxisInterval={5}
          decimalPlaces={0}
        />
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Notas Hoy:</Text>
        <Text style={styles.statValue}>{statistics.notes_today}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Notas Última Semana:</Text>
        <Text style={styles.statValue}>{statistics.notes_last_week}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statLabel: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
