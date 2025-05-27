import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Pressable,
  FlatList
} from 'react-native';

type RedeemModalProps = {
  visible: boolean;
  onClose: () => void;
  totalPoints: number;
  onRedeem: (points: number, categoryId: string) => void;
};

export default function RedeemModal({
  visible,
  onClose,
  totalPoints,
  onRedeem,
}: RedeemModalProps) {
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      fetch('/api/rewards/categories')
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.categories);
          setSelectedCategory(data.categories[0]?.id || '');
        })
        .catch(() => {
          Alert.alert('Failed to load reward options');
        });
    }
  }, [visible]);

  const validateAndRedeem = () => {
    const pointsNum = Number(pointsToRedeem);
    if (!pointsToRedeem || isNaN(pointsNum) || pointsNum <= 0) {
      Alert.alert('Please enter a valid positive number for points.');
      return;
    }
    if (pointsNum > totalPoints) {
      Alert.alert('You do not have enough points to redeem this amount.');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Please select a reward option.');
      return;
    }
    onRedeem(pointsNum, selectedCategory);
    onClose();
  };

  const selectedCategoryLabel = categories.find(c => c.id === selectedCategory)?.name || 'Select';

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000aa' }}>
        <View style={{ margin: 20, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Redeem Points</Text>

          <Text>Enter points to redeem:</Text>
          <TextInput
            keyboardType="numeric"
            value={pointsToRedeem}
            onChangeText={setPointsToRedeem}
            placeholder="Points"
            style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 8 }}
          />

          <Text>Select reward option:</Text>
          <Pressable
            onPress={() => setDropdownOpen(!dropdownOpen)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Text>{selectedCategoryLabel}</Text>
          </Pressable>

          {dropdownOpen && (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelectedCategory(item.id);
                    setDropdownOpen(false);
                  }}
                  style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}
                >
                  <Text>{item.name}</Text>
                </Pressable>
              )}
              style={{ maxHeight: 150, marginBottom: 10 }}
            />
          )}

          <Button title="Redeem" onPress={validateAndRedeem} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}
