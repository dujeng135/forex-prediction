import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

X = np.load("X.npy")
y = np.load("y.npy")

model = Sequential()
model.add(LSTM(64, input_shape=(5, 5)))
model.add(Dense(1))
model.compile(loss="mse", optimizer="adam")

model.fit(X, y, epochs=100, batch_size=16, verbose=1)
model.save("lstm_model.h5")
print("✅ Model berhasil disimpan")
