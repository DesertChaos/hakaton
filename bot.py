import telebot
from telebot import types
from ultralytics import YOLO
import time
 
# Загрузить модель
model = YOLO(r"C:\Users\Вадим\Desktop\tg_bot\best.pt")  # pretrained YOLO11n model

API_TOKEN = '7602626066:AAHKb0BWmiPral734oHGJeNWDDK4JBqlKjo'
bot = telebot.TeleBot(API_TOKEN)  # Ключ

# Установка вебхука
bot.delete_webhook()
bot.set_webhook(url='https://lemon-chefs-rule.loca.lt/bot' + API_TOKEN)

def detect_objects(image_path):
  # Запуск инференса на изображении
  results = model([image_path])  # Вернет список объектов результатов

  # Обработка результатов
  result = results[0]  # берем первый (и в данном случае единственный) результат

  # Путь для сохранения аннотированного изображения
  annotated_image_path = "annotated_image.jpg"
  result.save(filename=annotated_image_path)

  return annotated_image_path

@bot.message_handler(commands=['start'])
def start(message):
  botton_0 = types.ReplyKeyboardMarkup(resize_keyboard=True)
  botton_1 = types.KeyboardButton('Загрузить фото')
  botton_2 = types.KeyboardButton('Информация')
  botton_3 = types.KeyboardButton('Тех. поддержка')
  botton_0.add(botton_1, botton_2, botton_3)
  bot.send_message(message.chat.id, 'Я телеграмм бот для определения брака ноутбуков', reply_markup=botton_0)

@bot.message_handler(content_types=['text'])
def get_text_message(message):
  if message.text == 'бот':
    bot.send_message(message.chat.id, 'нажми /start')
  elif message.text == 'Загрузить фото':
    bot.send_message(message.chat.id, 'Пожалуйста, отправьте фото ноутбука для анализа.')
  elif message.text == 'Информация':
    bot.send_message(message.chat.id, 'Привет, я бот который найдет поломку в твоем ноутбуке. Чтобы я нашел ошибку загрузи картинку и при помощи нейросетей я выдам тебе результат с возможными поломками.')
  elif message.text == 'Тех. поддержка':
    bot.send_message(message.chat.id, '[Администратор](https://t.me/hantik_X)', parse_mode='Markdown')

@bot.message_handler(content_types=['photo'])
def handle_photo(message):
  bot.send_message(message.chat.id, 'Фото получено! Обрабатываем...')

while True:
    time.sleep(1)