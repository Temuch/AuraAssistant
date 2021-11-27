from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC

from deeppavlov import configs, build_model
ner_model = build_model(configs.ner.ner_ontonotes_bert_mult_torch, download=True)

def returndict(inp):
    ans = {}
    nertokens = ner_model([inp])
    print(nertokens)
    for i in range(len(nertokens[0][0])):
        if str(nertokens[1][0][i]).count("PER") > 0:
            if list(ans.keys()).count("person") == 0:
                ans['person'] = nertokens[0][0][i]
            else:
                ans['person'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("LOC") > 0 or str(nertokens[1][0][i]).count("FAC") > 0 or str(
                nertokens[1][0][i]).count("GPE") > 0:
            if list(ans.keys()).count("location") == 0:
                ans['location'] = nertokens[0][0][i]
            else:
                ans['location'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("ORG") > 0:
            if list(ans.keys()).count("organisation") == 0:
                ans['organisation'] = nertokens[0][0][i]
            else:
                ans['organisation'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("DATE") > 0:
            if list(ans.keys()).count("time") == 0:
                ans['time'] = nertokens[0][0][i]
            else:
                ans['time'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("MONEY") > 0:
            if list(ans.keys()).count("money") == 0:
                ans['money'] = nertokens[0][0][i]
            else:
                ans['money'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("GPE") > 0:
            if list(ans.keys()).count("money") == 0:
                ans['money'] = nertokens[0][0][i]
            else:
                ans['money'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("MONEY") > 0:
            if list(ans.keys()).count("money") == 0:
                ans['money'] = nertokens[0][0][i]
            else:
                ans['money'] += " " + nertokens[0][0][i]
        elif str(nertokens[1][0][i]).count("EVENT") > 0:
            if list(ans.keys()).count("event") == 0:
                ans['event'] = nertokens[0][0][i]
            else:
                ans['event'] += " " + nertokens[0][0][i]

    return ans

tasks = [
         {
            "name": "Разработать дизайн приложения",
            "status": "Работа над календарем",
            "team": [
                     {
                         "name": "Александра Зверева",
                         "icon": "",
                         "link": "t.me/zvendra"
                     }
            ]

         }
]

events = [
          {
              "type": "event",
              "name": "Встреча с Павлом Ильином",
              "date": "28.11.2021",
              "timestart": "14:00",
              "timeend": "16:00"
          },
          {
              "type": "event",
              "date": "28.11.2021",
              "timestart": "18:00",
              "timeend": "22:00",
              "name": "Корпоратив",
              "result": ""
          },
          {
              "type": "meeting",
              "date": "12.11.2021",
              "time": "12:00",
              "name": "Встреча с представителями Сбера",
              "result": "Подписан договор о сотрудничестве в сфере ИИ"
          }

]



def failure(*args: tuple):
  return {"answer": "Не удалось распознать команду"}

def prepare_corpus():
    corpus = []
    target_vector = []
    for intent_name, intent_data in config["intents"].items():
        for example in intent_data["examples"]:
            corpus.append(example)
            target_vector.append(intent_name)

    training_vector = vectorizer.fit_transform(corpus)
    classifier_probability.fit(training_vector, target_vector)
    classifier.fit(training_vector, target_vector)
vectorizer = TfidfVectorizer(analyzer="char", ngram_range=(2, 3))
classifier_probability = LogisticRegression()
classifier = LinearSVC()
prepare_corpus()

def get_intent(request):
    """
    Получение наиболее вероятного намерения в зависимости от запроса пользователя
    :param request: запрос пользователя
    :return: наиболее вероятное намерение
    """
    best_intent = classifier.predict(vectorizer.transform([request]))[0]

    index_of_best_intent = list(classifier_probability.classes_).index(best_intent)
    probabilities = classifier_probability.predict_proba(vectorizer.transform([request]))[0]

    best_intent_probability = probabilities[index_of_best_intent]

    print(best_intent_probability)
    if best_intent_probability > 0.15:
        return best_intent


def get_answer(request):

    voice_input_parts = request.split(" ")

    if len(voice_input_parts) == 1:
        intent = get_intent(request)
        if intent:
            ans = config["intents"][intent]["responses"]()
            return
        else:
            return config["failure_phrases"]()

    if len(voice_input_parts) > 1:
        for guess in range(2, len(voice_input_parts)):
            intent = get_intent((" ".join(voice_input_parts[0:guess])).strip())
            print(intent)
            if intent:
                command_options = [voice_input_parts[guess:len(voice_input_parts)]]
                print(command_options)
                ans = config["intents"][intent]["responses"](*command_options)
                answer = returndict(request)
                answer["answer"] = ans
                return answer
                break
        return config["failure_phrases"]()

from datetime import datetime, date
def search_meeting(*args: tuple):
    print("Looking for a meeting...")
    for event in events:
        if event['type'] == "meeting":
            datelist = events[0]["date"].split(".")
            timestart = events[0]["timestart"].split(":")
            meetingdate = datetime(int(datelist[2]),int(datelist[1]),int(datelist[0]), int(timestart[0]), int(timestart[1]))
            if meetingdate > datetime.now():
                return "У Вас назначена " + event["name"] + " на " + event["date"] + " в " + event["time"]

def func():
    a = 1
    # временный костыль

config = {
    "intents": {
        "greeting": {
            "examples": ["привет", "здравствуй", "добрый день",
                         "hello", "good morning"],
            "responses": func
        },
        "farewell": {+
                     "examples": ["пока", "до свидания", "увидимся"],
                     "responses": func
                     },
        "meetings_search": {
            "examples": ["ближайшие встречи",
                         "какие встречи",
                         "назначенные встречи"],
            "responses": search_meeting
        },
        "meetings_result": {
            "examples": ["Как прошла встреча",
                         "Результат встречи"],
            "responses": func
        },
        "meeting_record_result": {
            "examples": ["В результате",
                         "Результат встречи",
                         ""],
            "responses": func
        },
        "task_add": {
            "examples": ["Запиши",
                         "Добавь задачу"],
            "responses": func
        },

    },

    "failure_phrases": failure
}

class Item(BaseModel):
    request: str


app = FastAPI()


@app.post("/text/")
async def create_item(item: Item):
    return item
