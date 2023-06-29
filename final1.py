import os
from pathlib import Path
import traceback
import mysql.connector
import pdfkit
from pdf2image import convert_from_path
from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing
import sys
from moviepy.editor import *

slide_length = 5
root = 'html'
book_name = 'stock_investing'
chapter = 'mayhem'
h3 = 'How to Use Economic Reports to Make Smart Investment Decisions'

def main():
    x = 1
    createfolders('html', book_name, chapter)
    createfolders('pdf', book_name, chapter)
    createfolders('jpg', book_name, chapter)
    createfolders('audio', book_name, chapter)
    createfolders('video', book_name, chapter)
    #
    slide_length = generate_html(h3,chapter, book_name, chapter)

    print ('return slide length')
    print(slide_length)

    generate_jpg(book_name,chapter,slide_length)
    polly(chapter,book_name,chapter)
    vidgen(book_name, chapter, slide_length)

def createfolders(root, book_name, chapter):
    # book_name = 'investing'
    # chapter = "chapterx"
    html_file_name = "./{root}/{folder}/{filename}".format(folder=book_name, filename=chapter, root=root)

    # Check whether the specified path exists or not
    fpath = "./{root}/{folder}".format(folder=book_name, root=root)
    book = Path(fpath)
    isExist = book.exists()
    if not isExist:
        # Create a new directory because it does not exist
        Path(fpath).mkdir(parents=True, exist_ok=True)
        print("The new directory is created!")

    fpath2 = "./{root}/{folder}/{filename}".format(folder=book_name, filename=chapter, root=root)
    chapterPath = Path(fpath2)

    isExist = chapterPath.exists()

    if not isExist:
        # Create a new directory because it does not exist
        chapterPath.mkdir(parents=True, exist_ok=True)
        print("The new directory is created!")


def generate_html(h3, tag, folder, filename):
    x = 1
    mydb = mysql.connector.connect(
        host="localhost",
        user="thuy",
        password="qwerty123456",
        database="wordpress"
    )
    mycursor = mydb.cursor()

    slides = []

    placeHolderQuery = '''
    SELECT wp_posts.ID as ID, wp_posts.post_content as content FROM wp_posts
                                                                    join wp_postmeta wmla on wp_posts.ID = wmla.post_id

WHERE post_type = 'gpt_sum' and wmla.meta_key = 'tag' and wmla.meta_value = '{tag}'
ORDER BY ID ASC 
    '''
    query = placeHolderQuery.format(tag=tag)

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    placeHolderQuery2 = '''
        SELECT wp_posts.ID as ID, wp_posts.post_content as content FROM wp_posts
                                                                        join wp_postmeta wmla on wp_posts.ID = wmla.post_id

    WHERE post_type = 'gpt_linked' and wmla.meta_key = 'tag' and wmla.meta_value = '{tag}'
    ORDER BY ID ASC
        '''
    query2 = placeHolderQuery2.format(tag=tag)

    mycursor.execute(query2)

    myresult2 = mycursor.fetchall()

    print(len(myresult))
    print(len(myresult2))
    id = len(myresult2) - 1
    slide_length = len(myresult2) +  1
    for indek in range(0, len(myresult2)):
        mdic = {}
        sumitem = myresult[indek]
        mdic['sum'] = sumitem[1]
        linkedTup = myresult2[indek]
        mdic['linked'] = linkedTup[1]
        # id = id - 1
        slides.append(mdic)

    c = 0
    for x in slides:
        c = c + 1
        print(x)
        ulContent = x['sum']
        # h3 =  x['linked']
        p = x['linked']
        html_file_name = "./html/{folder}/{filename}/{filename}{no}.html".format(no=str(c), folder=folder, filename=filename)
        write_html(ulContent, h3, html_file_name, p)
    return slide_length
def generate_jpg(book,chapter,slide_length):
    x= 1
    folder = book
    file = chapter
    print ('slide length jpg')
    print(slide_length)
    for x in range(1,slide_length ):
        html_file = "./html/{folder}/{file}/{file}{no}.html".format(no=str(x), folder = folder, file = file)
        pdf_file = "./pdf/{folder}/{file}/{file}{no}.pdf".format(no=str(x) , folder = folder, file = file)
        jpg_file = "./jpg/{folder}/{file}/{file}{no}.jpg".format(no=str(x),folder = folder, file = file)


        pdfkit.from_file(html_file,pdf_file, options={"page-height": "270mm", "page-width": "470"})
        images = convert_from_path(pdf_file)

            # Save pages as images in the pdf
        images[0].save(jpg_file ,'JPEG')

        # for i in range(len(images)):


def write_html(input, h3, filename, p):
    file_html = open(filename, "w")
    # Adding the input data to the HTML file
    s1 = '''<html>
    <head>
    <title>HTML File</title>
            <link href='https://fonts.googleapis.com/css?family=Sue Ellen Francisco' rel='stylesheet'>
            <link href='https://fonts.googleapis.com/css?family=Barlow Semi Condensed' rel='stylesheet'>

    </head> 
    <body>
    <style>
    .banner-wrapper {
        position: relative;
    }

    .banner-background {
        display: block;
        width: 100%;
    }

    .banner-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 30px 50px 50px;
    }

    h2:first-of-type {
        margin: 30px 0;
        text-align: center;
        color: white;
        font-family: 'Sue Ellen Francisco';
        font-size: 45px;
    }

    ul:first-of-type {
        margin: 30px 0;
        color: white;
        font-family: 'Barlow Semi Condensed';
        font-size: 35px;
    }
    </style>

   <div class="banner-wrapper">
    <img class="banner-background" src="../../../img/chalkboard.png" alt=""/>
    <div class="banner-content">
    <h2>
    '''
    s10 = '''
    </h2>
   '''

    ulcloseTag = '''
    </div>
    </div>
    '''
    s2 = """

    </body>
    </html>
    """
    s = s1 + h3 + s10 + input + ulcloseTag +  p + s2
    file_html.write(s)
    # Saving the data into the HTML file
    file_html.close()

def polly(tag,book,chapter):

    # Create a client using the credentials and region defined in the [adminuser]
    # section of the AWS credentials file (~/.aws/credentials).
    session = create_customized_session('AKIAR7J2NMOGGZ234L5N','vfQmjiKLk+7SY7HPjGAjxWilxlinOdrcydx5LDLu' ,None, 'us-west-2', None)
    polly = session.client("polly")
    c = 0

    mydb = mysql.connector.connect(
        host="localhost",
        user="thuy",
        password="qwerty123456",
        database="wordpress"
    )
    mycursor = mydb.cursor()

    slides = []


    placeHolderQuery2 = '''
           SELECT wp_posts.ID as ID, wp_posts.post_content as content FROM wp_posts
                                                                           join wp_postmeta wmla on wp_posts.ID = wmla.post_id

       WHERE post_type = 'gpt_linked' and wmla.meta_key = 'tag' and wmla.meta_value = '{tag}'
       ORDER BY ID ASC 
           '''
    query2 = placeHolderQuery2.format(tag=tag)
    mycursor.execute(query2)

    myresult2 = mycursor.fetchall()
    id = len(myresult2) - 1
    for indek in range(0, len(myresult2)):
        c = c + 1
        linkedTup = myresult2[indek]
        id = id - 1

        audio = linkedTup[1]
        ulContent = ''

        html_file_name = "./audio/{book}/{chapter}/{chapter}{no}.mp3".format(no=str(c), book = book , chapter = chapter)
        try:
            # Request speech synthesis
            response = polly.synthesize_speech(Text=audio, OutputFormat="mp3",
                                                VoiceId="Joanna")
        except (BotoCoreError, ClientError) as error:
            # The service returned an error, exit gracefully
            print(error)
            sys.exit(-1)

        # Access the audio stream from the response
        if "AudioStream" in response:
            # Note: Closing the stream is important because the service throttles on the
            # number of parallel connections. Here we are using contextlib.closing to
            # ensure the close method of the stream object will be called automatically
            # at the end of the with statement's scope.
                with closing(response["AudioStream"]) as stream:
                   # output = os.path.join(gettempdir(), "speech.mp3")
                   output = html_file_name

                   try:
                    # Open a file for writing the output as a binary stream
                        with open(output, "wb") as file:
                           file.write(stream.read())
                   except IOError as error:
                      # Could not write to file, exit gracefully
                      print(error)
                      sys.exit(-1)

        else:
            # The response didn't contain audio data, exit gracefully
            print("Could not stream audio")
            sys.exit(-1)

        # Play the audio using the platform's default player
        # if sys.platform == "win32":
        #     os.startfile(output)
        # else:
        #     # The following works on macOS and Linux. (Darwin = mac, xdg-open = linux).
        #     opener = "open" if sys.platform == "darwin" else "xdg-open"
        #     subprocess.call([opener, output])



# To Create customized session:
def create_customized_session(aws_access_key, aws_secret_key, aws_token,
    region_name=None,profile_name=None):
       session = Session(aws_access_key_id=aws_access_key,
                                       aws_secret_access_key=aws_secret_key,
                                       aws_session_token = aws_token,
                                       region_name=region_name,
                                       profile_name = profile_name)
       # Here, region_name and profile_name are optional parameters and default value is None

       return session

def vidgen(book,chapter, slide_length):
    print('slide length vd')
    print(slide_length)

    # # for x in range(1,slide_length):
    # x = 5
    # txt1 = "./jpg/{book}/{chapter}/{chapter}{no}.jpg".format(no=str(x), book = book,chapter = chapter)
    #
    # clip = ImageClip(txt1)  # or .jpeg, .tiff, ...
    # audio_path = "./audio/{book}/{chapter}/{chapter}{no}.mp3".format(no=str(x) , book = book,chapter = chapter)
    # new_audioclip = AudioFileClip(audio_path)
    # audion_duration = new_audioclip.duration
    # # or .ogg, .wav... or a video !
    # clip.audio = new_audioclip
    # video = CompositeVideoClip([clip]).set_duration(audion_duration).set_fps(15)
    # vid_name = "./video/{book}/{chapter}/{chapter}{no}.mp4".format(no=str(x) ,book = book,chapter = chapter)
    # video.write_videofile(vid_name)

    for x in range(1,slide_length + 1):
        txt1 = "./jpg/{book}/{chapter}/{chapter}{no}.jpg".format(no=str(x), book = book,chapter = chapter)

        clip = ImageClip(txt1)  # or .jpeg, .tiff, ...
        audio_path = "./audio/{book}/{chapter}/{chapter}{no}.mp3".format(no=str(x) , book = book,chapter = chapter)
        new_audioclip = AudioFileClip(audio_path)
        audion_duration = new_audioclip.duration
        # or .ogg, .wav... or a video !
        clip.audio = new_audioclip
        video = CompositeVideoClip([clip]).set_duration(audion_duration).set_fps(15)
        vid_name = "./video/{book}/{chapter}/{chapter}{no}.mp4".format(no=str(x) ,book = book,chapter = chapter)
        video.write_videofile(vid_name)
    # concatevid()

if __name__ == '__main__':
    main()
