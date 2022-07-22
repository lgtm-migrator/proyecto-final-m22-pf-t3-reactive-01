import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const logIn = async (firstname, check, email, password) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User creado');
      const current = auth().currentUser;
      addUserInfo(firstname, check, email, current.uid, 'client');
    })
    .catch(err => {
      if (
        err?.message ===
        '[auth/email-already-in-use] The email address is already in use by another account.'
      ) {
        alert('The email address is already in use by another account.');
      }
    });
};

export const SignIn = async (email, password) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch(error => {
      alert('Usuario y/o contraseña incorrectos');
    });
};

export const addUserInfo = async (
  firstname,
  suscribe,
  email,
  uid,
  usertype,
) => {
  await firestore()
    .collection('Users')
    .add({
      firstname: firstname,
      suscribe: suscribe,
      email: email,
      uid: uid,
      usertype: usertype,
    })
    .then(() => {})
    .catch(error => console.log(error));
};
export const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (currentUser, setUserInfo) => {
  await firestore()
    .collection('Users')
    .where('uid', '==', currentUser.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setUserInfo(documentSnapshot.data());
      });
    })
    .catch(error => console.log(error));
};

export const addProduct = async (
  name,
  category,
  price,
  condition,
  description,
  stock,
) => {
  const current = await auth().currentUser.uid;
  await firestore()
    .collection('Products')
    .add({
      name: name,
      category: category,
      price: parseFloat(price),
      condition: condition,
      description: description,
      stock: parseInt(stock),
      uid: current,
    })
    .then(() => {
      alert('The product has been added successfully!');
    })
    .catch();
};
