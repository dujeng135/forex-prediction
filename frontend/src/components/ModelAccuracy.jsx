import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const accuracyData = [
  { epoch: 'Epoch 1', accuracy: 72 },
  { epoch: 'Epoch 2', accuracy: 75 },
  { epoch: 'Epoch 3', accuracy: 78 },
  { epoch: 'Epoch 4', accuracy: 81 },
  { epoch: 'Epoch 5', accuracy: 85 },
];

export default function ModelAccuracy() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-[600px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 Model Accuracy</h2>
      <p className="text-sm text-gray-600 mb-4">LSTM training accuracy over last few epochs.</p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={accuracyData}>
          <XAxis dataKey="epoch" />
          <YAxis domain={[60, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Accuracy (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
