import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const EstadisticasScreen = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
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

      fetchStatistics();
      
      // Reset the loading state for next focus
      return () => {
        setLoading(true);
        setStatistics(null);
      };
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const data = [
    {
      name: 'Última semana',
      count: statistics.notes_last_week,
      color: '#FF6347',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Hoy',
      count: statistics.notes_today,
      color: '#4682B4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estadísticas de Notas</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#FFFFFF',
            },
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Notas en la última semana:</Text>
        <Text style={styles.statValue}>{statistics.notes_last_week}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Notas de hoy:</Text>
        <Text style={styles.statValue}>{statistics.notes_today}</Text>
      </View>
    </ScrollView>
  );
};

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
    marginVertical: 10,
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

export default EstadisticasScreen;
