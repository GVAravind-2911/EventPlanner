import sqlalchemy
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import CheckConstraint

Base = declarative_base()

def checkUsername(username):
    if len(username) <=20:
        username = set(username)
        masterSet = {chr(i) for i in range(97,123)}.union({chr(i) for i in range(48,58)}).union({'_'})
        return True if username.issubset(masterSet) else False
    else:
        return False

def checkPassword(password):
    if len(password)<=30:
        password = set(password)
        masterSet = {chr(i) for i in range(97,123)}.union({chr(i) for i in range(65,91)}).union({chr(i) for i in range(48,58)}).union({'_'})
        return True if password.issubset(masterSet) else False

class LoginTable(Base):

    __tablename__ = 'user_login_details'

    username = sqlalchemy.Column(sqlalchemy.String(20),primary_key=True)
    password = sqlalchemy.Column(sqlalchemy.String(30))

    @staticmethod
    def createTable():
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        Base.metadata.create_all(engine)

    @staticmethod
    def checkInfo(username,password):
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind = engine)()
        data = session.query(LoginTable).filter(LoginTable.username == username,LoginTable.password == password).all()
        if data:
            return True
        else:
            return False

    @staticmethod
    def addUser(username,password):
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind=engine)()
        if checkUsername(username) and not LoginTable.checkUser(username):
            data = LoginTable(username=username,password=password)
            session.add(data)
            session.commit()
            session.close()
            return True
        return False

    @staticmethod
    def checkUser(username):
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind = engine)()
        data = session.query(LoginTable).filter(LoginTable.username == username).all()
        if len(data) == 1:
            return True
        else:
            return False
        
#write the sqlalchemy code for the events table from my javascript responses
class EventTable(Base):
    __tablename__ = 'events'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    eventname = sqlalchemy.Column(sqlalchemy.String)
    eventdescription = sqlalchemy.Column(sqlalchemy.String)
    eventlogo = sqlalchemy.Column(sqlalchemy.String)
    eventcategory = sqlalchemy.Column(sqlalchemy.String)
    eventtype = sqlalchemy.Column(sqlalchemy.String)
    eventreach = sqlalchemy.Column(sqlalchemy.String)
    eventlocation = sqlalchemy.Column(sqlalchemy.String)
    eventlimit = sqlalchemy.Column(sqlalchemy.Boolean)
    eventlimitnumber = sqlalchemy.Column(sqlalchemy.Integer)
    eventprice = sqlalchemy.Column(sqlalchemy.Float)
    eventpaymentlink = sqlalchemy.Column(sqlalchemy.String)
    eventstartdate = sqlalchemy.Column(sqlalchemy.String)
    eventenddate = sqlalchemy.Column(sqlalchemy.String)
    eventclosingdate = sqlalchemy.Column(sqlalchemy.String)

    @staticmethod
    def createTable():
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        Base.metadata.create_all(engine)
    
    @staticmethod
    def addEvent(eventname,eventdescription,eventlogo,eventcategory,eventtype,eventreach,eventlocation,eventlimit,eventlimitnumber,eventprice,eventpaymentlink,eventstartdate,eventenddate,eventclosingdate):
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind=engine)()
        data = EventTable(eventname=eventname,eventdescription=eventdescription,eventlogo=eventlogo,eventcategory=eventcategory,eventtype=eventtype,eventreach=eventreach,eventlocation=eventlocation,eventlimit=eventlimit,eventlimitnumber=eventlimitnumber,eventprice=eventprice,eventpaymentlink=eventpaymentlink,eventstartdate=eventstartdate,eventenddate=eventenddate,eventclosingdate=eventclosingdate)
        session.add(data)
        session.commit()
        session.close()
        return True

    @staticmethod
    def getEvents():
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind=engine)()
        data = session.query(EventTable).all()
        session.close()
        
        event_dict = []
        for event in data:
            event_dict.append({
                'id': event.id,
                'eventname': event.eventname,
                'eventdescription': event.eventdescription,
                'eventlogo': event.eventlogo,
                'eventcategory': event.eventcategory,
                'eventtype': event.eventtype,
                'eventreach': event.eventreach,
                'eventlocation': event.eventlocation,
                'eventlimit': event.eventlimit,
                'eventlimitnumber': event.eventlimitnumber,
                'eventprice': event.eventprice,
                'eventpaymentlink': event.eventpaymentlink,
                'eventstartdate': event.eventstartdate,
                'eventenddate': event.eventenddate,
                'eventclosingdate': event.eventclosingdate
            })    
        return event_dict

    @staticmethod
    @staticmethod
    def getEvent(id):
        engine = sqlalchemy.create_engine('sqlite:///mainstore.db')
        session = sessionmaker(bind=engine)()
        data = session.query(EventTable).filter(EventTable.id == id).all()
        session.close()
        event_dict = []
        for event in data:
            event_dict.append({
                'id': event.id,
                'eventname': event.eventname,
                'eventdescription': event.eventdescription,
                'eventlogo': event.eventlogo,
                'eventcategory': event.eventcategory,
                'eventtype': event.eventtype,
                'eventreach': event.eventreach,
                'eventlocation': event.eventlocation,
                'eventlimit': event.eventlimit,
                'eventlimitnumber': event.eventlimitnumber,
                'eventprice': event.eventprice,
                'eventpaymentlink': event.eventpaymentlink,
                'eventstartdate': event.eventstartdate,
                'eventenddate': event.eventenddate,
                'eventclosingdate': event.eventclosingdate
            })    
        return event_dict


if __name__ == '__main__':
    # LoginTable.createTable()
    # LoginTable.addUser('hello','hello')
    EventTable.createTable()