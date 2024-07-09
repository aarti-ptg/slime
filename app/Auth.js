import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'users.txt';

export const signUp = async (email, password) => {
  const user = {
    email,
    password,
  };
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
  await verifyFileContents();  // Optional: For debugging purposes
};

export const login = async (email, password) => {
  const users = await getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return !!user;
};

export const logout = async () => {
  // Implement logout if necessary
};

const getUsers = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    console.log('File Path:', filePath);
    console.log('File Exists:', fileInfo.exists);
    if (!fileInfo.exists) {
      return [];
    }
    const fileContents = await FileSystem.readAsStringAsync(filePath);
    console.log('File Contents:', fileContents);
    return JSON.parse(fileContents) || [];
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const saveUsers = async (users) => {
  try {
    console.log('Writing users to file:', users);
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(users));
    console.log('Write successful');
  } catch (error) {
    console.error('Error saving users file:', error);
  }
};

const verifyFileContents = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      const fileContents = await FileSystem.readAsStringAsync(filePath);
      console.log('Verified file contents:', fileContents);
    } else {
      console.log('File does not exist for verification.');
    }
  } catch (error) {
    console.error('Error verifying file contents:', error);
  }
};
