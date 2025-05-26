import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";

const GET_PLAYERS = gql`
  query {
    players {
      id
      name
      age
      position
      stats {
        goals
        assists
        matches
      }
      team {
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {data.players.map((player) => (
        <View key={player.id} style={styles.card}>
          <Text style={styles.name}>{player.name}</Text>
          <Text>{player.position} | Age: {player.age}</Text>
          <Text>Team: {player.team.name}</Text>
          <Text>Stats: {player.stats.goals}G / {player.stats.assists}A</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  name: { fontSize: 18, fontWeight: "bold" },
});
