class QuestionManager:
    def __init__(self, questionList, categoryDict):
        self.questionList = questionList
        self.categoryDict = categoryDict

    def count_by_category(self, category):
        count = 0
        for question in self.questionList:
            if question.question_category == category:
                count += 1
        return count