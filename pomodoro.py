from datetime import datetime
from datetime import timedelta

def get_slots(total_mins, focus_mins=25, break_mins=5):
    slots = []
    time_left = total_mins
    while time_left > 0:
        if slots:
            if slots[-1][1] == "break":
                if focus_mins > time_left:
                    focus_mins -=time_left
                slots.append((focus_mins, "focus"))
                time_left -= focus_mins
            else:
                if break_mins > time_left:
                    break_mins -= time_left
                slots.append((break_mins, "break"))
                time_left -= break_mins
        else:
            if focus_mins > time_left:
                focus_mins -= time_left
            slots.append((focus_mins, "focus"))
            time_left -= focus_mins

    return slots

def get_time_slots(start, end, focus_mins=25, break_mins=5):
    total_mins = (end - start).total_seconds() / 60.0
    slots = get_slots(total_mins, focus_mins, break_mins)
    time_slots = []
    time = start
    for slot in slots:
        end_time = time + timedelta(minutes=slot[0])
        time_slot = {
            "start": time,
            "end": end_time,
            "type": slot[1]
        }
        time_slots.append(time_slot)
        time = end_time

    return time_slots

def get_time_slots_with_conflicts(start, end, conflicts):
    print(conflicts)
    slots_without_conflicts = []
    if conflicts:
        if start < conflicts[0][0]:
            start_time = start
        else:
           start_time = max(conflicts[0][1], start)
    else:
        return get_time_slots(start, end)
    for i in range(len(conflicts)):
        end_time = min(end, conflicts[i][0])
        slots_without_conflicts.append((start_time, end_time))
        start_time = conflicts[i][1]
    if end_time < end:
        slots_without_conflicts.append((start_time, end))
    print(slots_without_conflicts)
    time_slots = []
    for slot in slots_without_conflicts:
        time_slots.extend(get_time_slots(slot[0], slot[1]))

    return time_slots

"""
Using two lists of time ranges, finds all ranges for which they overlap.
"""
def findCommon(list1, list2, minLength=timedelta(minutes=0)):
    newList = []
    for range1 in list1:
        for range2 in list2:
            overlapStart = max(range1[0], range2[0]) # the latest start time
            overlapEnd = min(range1[1], range2[1]) # the earliest end time
            print("overlapStart", overlapStart)
            print("overlapEnd", overlapEnd)
            print("overlapEnd - overlapStart", overlapEnd - overlapStart)
            if overlapEnd - overlapStart >= minLength:
                print("here")
                newList.append((overlapStart, overlapEnd))
    return newList

"""
Recursively finds the common times in several lists by taking the first two
items and finding their common ranges and then taking that new set of ranges
and applying it to the next item and so on.
"""
def reduce(listOfLists, minLength=timedelta(minutes=0)):
    if len(listOfLists) > 2:
        return reduce([findCommon(listOfLists[0], listOfLists[1], minLength)] + listOfLists[2:], minLength)
    else:
        return findCommon(listOfLists[0], listOfLists[1], minLength)
