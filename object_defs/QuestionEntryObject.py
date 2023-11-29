class QuestionEntryObject:
    def __init__(self,
                 question,
                 question_category,
                 question_type,
                 question_points,
                 question_time,
                 media_url,
                 note,
                 link,
                 correct_answer,
                 choice2,
                 choice3,
                 choice4,
                 etc,
                 unused,
                 zone1,
                 zone2,
                 zone3,
                 zone4,
                 livestream):
        self.question = question
        self.question_category = question_category
        self.question_type = question_type
        self.question_points = question_points
        self.question_time = question_time
        self.media_url = media_url
        self.note = note
        self.link = link
        self.correct_answer = correct_answer
        self.choice2 = choice2
        self.choice3 = choice3
        self.choice4 = choice4
        self.etc = etc
        self.unused = unused
        self.zone1 = zone1
        self.zone2 = zone2
        self.zone3 = zone3
        self.zone4 = zone4
        self.livestream = livestream