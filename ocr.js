import vision from "@google-cloud/vision";
import { cleanData } from "./dataClean.js";

const CREDENTIALS = JSON.parse(
  JSON.stringify({
    "type": "service_account",
    "project_id": "civil-sentry-409106",
    "private_key_id": "f7812dc6c277c7d600145a03e54dbc1021296a80",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCr9aSrCI15P7+s\n1M3QfDkqQHiyFFRoQHfU5sp2eQWaCxeogoeyYiKmT9OROLFjLEqAF+cMVwkFqQ9d\nwmmmCZPiEJlTCXmCguVK4vxRjiaPTVfgg6RMa6Fnpa8gl/YKjBruPxxpXtuMPwAj\nU2QuP0RquV2h/aknoxiBS8Z0etYZVOUp5n/O4d0G6X0JO+l8ogfsxNzKSvBzvnhx\n6qGqSafn703q3YtqkFvMKHEQkb3cLJyt7ydponYXHMmEJ2hr3npXlF1T8n++bA30\nfwkiuNw6vmsyurhEUTWX3iAc31Wzk0TkczGnn077ugqZLvdSSIIHMF/GyaLk6t6H\nsHfMGu55AgMBAAECggEAJXLvJCJOMSAtfZWwpt1O08FLp7iesz+K+U4zvH5ZtnUA\n931J0RLnKeILmL5If2kXZnMOKdVQjS+GvawHtxWx45Mq2Pcgw8f+6IKrYZV8F0xI\nPYhdwRjVg02FaKs/dYeSm90ZsmbqmE3mGUthb2Lu4vEwj4U/D/dIcGwQsbBIrSZB\nCQ3fqwMe6WJbL6l95JFiPDPCbXzQ9HcHK/4UqyIFPPqhMo7igPTf7QfVMVPTIWmn\ndAaR//d2abHYZjGr//cq5RqGTHpt+VrMnbxIlQBL4AMHiN0yj1YBBmQ9emQESABH\nJkATGLtw5yx0adeaUexqASPpHgDoxLbLIlf6Z+5h0wKBgQDR9ZbvaC8k5UMM4uW/\nr3KfvK+eeidP3ZjiAMXliPjIbbNH7odaMFPbXPaiNY0OVySWxKEU52ax90/Zugzn\nlKqPxHGe1KB4fjP0ytHPQs/3Tw9CbS0weSyojLMYK9bODc24QiVRMOuhKg1GhHBC\nlwBay9NmfCX4E/TYx7LMKRR4QwKBgQDRqt+QYqFbpnmKof9JUvE+Br0+gYOklNHg\nCRIkBiXGDWgU2gymsnMVuOjIvskp7sDjk9YxUGyZw56omTK5IdV92zA+QCuprfWS\nbnTRmqije4BjhmBChZViMepTvT3TS3gGUwU8gj5O9+HiM0E6RypFraODh8jhfBoW\nMgMFIhCgkwKBgQCkm6vzFLZpcckIsFc52l6+d5skX1a02eJDxiFhHOsXkFIPoiXC\nAsOr5w2CDQQC6zVHcu9rSSSNgHy9EY2OflLelkASK1eIQEGRuPWXTiVoGja3eIsG\nRupJVs4OtEgbklzoCgvhxL3nw+VWlPzCaEqh5M1fuxO1lEfRMXevcsGWqwKBgQCX\nbPVx7gnji2QUf9NEPacFyRA8aIWPA/xf9a0oX1hApcYZ6TFh41fCxH07Hq9inZCp\nzEfR7efBVcrssVg05P6vmvJIw0fFkGHfk+7CwxQwni2ns5Ep+hhdhvdZ6z8Pr13M\nE4GgpeAiYFy/ZY0ibetVz4ZcpGCsmVit1wjfWC7yCQKBgQCdAf8trnUHDGW2pysS\nIOYsKMR+grVQasZMuir2DvLkreOzsPENdyYWdWUZF9H2ReRgJan8/NuoLUQYv6Bw\nAQSDrf+zCajWBkmO6JryzLmDH4mmNw1g5bGkHbiQxmEiPXubwZUKUhwT3dNzfP8n\nH2JK575ajGm6e775jIH1OrmzxQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "shubhankarbhatt@civil-sentry-409106.iam.gserviceaccount.com",
    "client_id": "116958904931562909307",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/shubhankarbhatt%40civil-sentry-409106.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  })
);

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);
function removeThaiWords(sentence) {
  const thaiCharacterRange = /[\u0E00-\u0E7F]/;

  const words = sentence.split(/\s+/);

  const nonThaiWords = words.filter((word) => !thaiCharacterRange.test(word));

  const modifiedSentence = nonThaiWords.join(" ");

  return modifiedSentence;
}
export const ocrData = async (path) => {
  let [result] = await client.textDetection(path);
  let arrString = result.fullTextAnnotation.text;
  let cleanText = removeThaiWords(arrString);
  // console.log(cleanText);
  let data = cleanData(cleanText);
  return data;
};



