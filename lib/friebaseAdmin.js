import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (Server-side only)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'myaha-waitlist',
      clientEmail:
        'firebase-adminsdk-fbsvc@myaha-waitlist.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC87WWJCdyUPhck\nhNDUGOoaq4kAmAgBaXbw5hVZDoDOek/jLJB1sJjS37zvURJyoefaf8HAuzmj5/9M\nfe7LkbSY5BVlSWinUEBBFfuhFyhOdm06aW1ATDec6StNbE60McUiXpF03G7156n3\nRT9fQVfcOR/QygbRzDmvb6VBK8Uk1Ksc0fKZaTMso7tCrLkVWqcrxejaoC99R9GT\ncz4wLNQfHvYdGTAvn9jq9u2V5A8boN22NL3F08UwWI4T5sqEkFCmYYz3o3veGKjV\nZSye7Js1wAWM+9ciOL1+uVgODvcmmsu+/MwHLcwiYQWTehJbqQWBFvkgBvjrhwOs\nYfpsbsxrAgMBAAECggEABR7uhOLs/0qOGDY3NEiFr+h3FovxHQ/07he8+6ptsp9m\nF0wR7lMStESImKbpiXWGWuyzkeqBOXTVzwbH5u1gHIBsVX58nGxdKMOOrtd5e3tT\nud8LIZZMXoEmWMbiwoHG1/C75ar+FX/d/4M/LB+dSa1eVwic/rT08SKTvwUyg9vp\npfvIjq731uVIN3bry7XZ3LzjL7e+7ywPtf9WRQqUfzHEKZC+MG8D10LAsWkUY13W\ndC4itqe3nnFh9RS3aDT0dOkKUfRuz/mFnArlcW9cPvHcrwidvr61JktJHa1ybb85\n5vd5rik4cxYJaALAqjC3zcGOqnWp9B8FqW7qmv7ooQKBgQD2jA2OvYiwkVQ5NBiQ\naIqWim/0etOSrPob1vQUbkVVu2X930uvqk2hdzZTiOckyyvCwpxjiUIDSA/FRHtV\nxchlDH6XKjkosBMc8rq/AH80meaKCK5DSH5V9Aw4yzGpwJbhEW591/N9I/9E7iHG\nyICucB4vtnpjxU5kxX0LzEPOlQKBgQDEK8kOB8GYI4Hx8IR90kE+UkdzAMj7McPV\n03uPoZrddYdUafRsEgNcBH0pq5KxSQ/bnfwVAAFeFA4+DYBmdnY6x15GpsNAQU+g\n/SmPHEtAmN+CnqH+vp8rPGy/o8/RoOPXwg61w3vOS1+wrn4xFD4CtDpWYVOO+GIU\nESeIoaBu/wKBgEj/NpRosav1m4ZEUnGPQllIK9Wq+DGZXYQYpLPX4ld74LrF/lbI\niaug7EjXY/iU3yQPEta1sQHfuCukFxBSOv8QL/r52Wqel0oe5APhVchxOLztzQrG\n0AEK/QNjxhSInSOOUbSY19LZcZ8rEn0UqGT9dTKTSLF5nbhgcKGpnPnxAoGABVWD\ndAQ1+WMNx3xYvesXpxAprTDaRipGPuwvMeqdAWSOt3biFIYw3TGqDZYCuRtZeQlE\nr3V+lAZLlNhdI2wZLuP45kbmjDq6ZZA8rw1/5lPB0BVsJjccsNpFwrg7kGGlkFpQ\neBTGqwdVpMI54C/Ct+QaqfqfgQWz9QO6ZXavnBUCgYAjtJy61Imy3DUuYuYtCLUZ\nPX4P3WumjBurGFgQT2DRd9VICk3iEK6XVHiBupQ5uzHT9cmTd45wYVPReZYjtDD0\nEIN8IkT/kKXNKNsfNdzrXUQv69AGQZuutfFli+wozfnpzQLqdMGHR5SLtEZYV0Zr\ndnfxM6QaGlZpT6CXTpQAFA==\n-----END PRIVATE KEY-----\n'.replace(
          /\\n/g,
          '\n',
        ),
    }),
  });
}

const db = getFirestore();

export { db };
