// Seed exercises + Elliott's May–Oct 2026 history. Loaded by index.html.
window.SEED = (() => {
  // key, name, day, kind, working_weight, increment, target_reps, target_sets, core
  const EX = [
    ['bench',   'Bench press',          'push', 'weight',     50, 5,   5,  3, true],
    ['press',   'Military press',       'push', 'weight',     30, 5,   5,  3, true],
    ['squat',   'Barbell squat',        'legs', 'weight',     55, 5,   5,  3, true],
    ['swing',   'KB swings',            'legs', 'swing',      14, 2,   30, 2, true],
    ['wide',    'Wide grip pull-ups',   'pull', 'bodyweight',  0, 2.5, 5,  3, true],
    ['close',   'Close grip pull-ups',  'pull', 'bodyweight',  0, 2.5, 5,  3, true],
    ['row',     'Seated row',           'pull', 'weight',     49, 2.5, 5,  3, true],
    // occasional extras (core=false): reachable via "add another exercise"
    ['pulldown','Lat pulldown',         'pull', 'weight',     42, 2.5, 8,  3, false],
    ['kbsquat', 'KB goblet squat',      'legs', 'weight',     14, 2,   10, 3, false],
    ['lunge',   'Lunges (per hand)',    'legs', 'weight',     14, 2,   6,  3, false],
    ['incline', 'Incline DB bench (each)','push','weight',    16, 2,   10, 3, false],
    ['latraise','Lat raises',           'push', 'weight',      6, 1,   15, 3, false],
    ['curl',    'Dumbbell curls (each)','other','weight',     14, 2,   8,  3, false],
    ['hammer',  'Hammer curls (each)',  'other','weight',     16, 2,   8,  3, false],
    ['plank',   'Side plank (sec/side)','other','weight',      0, 0,   60, 1, false],
  ];
  // [date, key, weight, reps, isTest]
  const Y = '2026-';
  const S = [
    ['05-21','swing',12,35],['05-21','bench',50,5],['05-21','curl',14,7],
    ['05-23','wide',0,8],['05-23','pulldown',35,12],['05-23','pulldown',35,12],['05-23','pulldown',42,12],['05-23','close',0,5],
    ['05-26','press',30,7],['05-26','press',30,8],['05-26','press',30,5],['05-26','latraise',5,23],
    ['05-28','swing',12,30],['05-28','swing',14,30],['05-28','kbsquat',14,10],['05-28','squat',40,8],['05-28','squat',40,11],
    ['05-30','bench',40,14],['05-30','bench',40,14],['05-30','bench',40,14],['05-30','bench',40,8],
    ['06-03','swing',12,33],['06-03','swing',12,30],['06-03','squat',40,12],['06-03','squat',40,12],['06-03','squat',40,5],
    ['06-05','press',30,7],['06-05','wide',0,7],['06-05','bench',50,5],['06-05','latraise',6,17],['06-05','close',0,8],
    ['06-08','wide',0,8],['06-08','close',0,8],['06-08','pulldown',42,8],['06-08','row',42,12],['06-08','row',42,10],
    ['06-11','swing',12,35],['06-11','swing',12,20],['06-11','squat',40,5],['06-11','squat',45,5],['06-11','squat',45,3],
    ['06-12','incline',14,12],['06-12','incline',16,14],['06-12','incline',16,11],['06-12','latraise',6,14],['06-12','latraise',6,14],
    ['06-13','curl',14,7],['06-13','curl',14,9],['06-13','hammer',16,9],['06-13','plank',0,65],
    ['06-20','wide',0,9],['06-20','wide',0,5],['06-20','close',0,8],['06-20','close',0,4],['06-20','row',28,24],
    ['06-23','swing',12,35],['06-23','swing',14,25],['06-23','pulldown',42,15],
    ['06-25','lunge',14,6],['06-25','lunge',14,6],['06-25','lunge',14,6],
    ['06-28','bench',40,10],['06-28','bench',45,7],['06-28','press',30,5],
    ['06-29','squat',40,5],['06-29','squat',45,3],['06-29','squat',50,3],['06-29','squat',55,3],['06-29','squat',60,1,1],['06-29','squat',65,1,1],
    ['06-30','wide',0,9],['06-30','wide',0,7],['06-30','row',42,10],['06-30','row',49,8],
    ['07-03','bench',45,4],['07-03','bench',50,2,1],['07-03','bench',55,2,1],['07-03','press',30,4],
    ['07-06','wide',0,8],['07-06','close',0,8],['07-06','row',49,10],
    ['07-07','swing',14,33],['07-07','squat',55,3],['07-07','squat',60,2,1],['07-07','squat',65,2,1],
    ['07-10','bench',40,5],['07-10','bench',50,3],['07-10','bench',55,2,1],['07-10','press',30,5],['07-10','press',35,2,1],
    ['07-13','pulldown',49,8],['07-13','pulldown',49,9],['07-13','row',49,9],
    ['07-14','lunge',14,6],['07-14','lunge',14,6],['07-14','lunge',14,7],
    ['07-16','press',30,5],['07-16','press',35,3],['07-16','bench',50,2,1],['07-16','bench',55,2,1],['07-16','bench',60,1,1],
    ['07-22','wide',0,8],['07-22','close',0,8],['07-22','pulldown',49,5],['07-22','row',49,5],
    ['07-25','bench',40,5],['07-25','bench',50,4],['07-25','bench',60,1,1],['07-25','press',30,7],
    ['07-28','swing',12,30],['07-28','squat',50,3],['07-28','squat',60,3],['07-28','squat',65,2,1],
    ['08-03','swing',14,25],['08-03','squat',50,5],['08-03','squat',65,2,1],['08-03','squat',65,1,1],
    ['08-07','wide',0,7],['08-07','bench',50,6],['08-07','bench',50,5],
    ['08-12','press',30,5],['08-12','press',35,3],['08-12','press',35,3],['08-12','bench',40,5],['08-12','bench',55,2,1],
    ['08-19','squat',50,3],['08-19','swing',14,30],['08-19','squat',60,2],['08-19','squat',65,2,1],['08-19','squat',70,1,1],['08-19','squat',70,1,1],
    ['08-21','wide',0,7],['08-21','wide',0,4],['08-21','close',0,6],
    ['08-26','bench',50,5],['08-26','bench',60,2,1],['08-26','bench',60,3,1],
    ['08-28','swing',12,30],['08-28','squat',60,1],['08-28','squat',70,2,1],
    ['08-31','wide',0,7],['08-31','row',49,10],
    ['09-24','bench',50,6],['09-24','press',30,5],['09-24','press',30,4],['09-24','press',30,5],
    ['09-25','wide',0,7],['09-25','close',0,5],
    ['10-01','bench',50,5],['10-01','bench',60,1,1],
    ['10-06','wide',0,7],['10-06','close',0,6],['10-06','close',0,5],
    ['10-07','squat',60,2],['10-07','squat',70,2,1],['10-07','squat',70,2,1],
    ['10-08','press',35,3],
    ['10-12','bench',50,4],['10-12','bench',60,2,1],['10-12','bench',55,4],
  ];
  // [date, machine, minutes, calories, distance(mi)]
  const C = [
    ['08-21','Treadmill',4,null,0.4],['08-26','Treadmill',4,null,null],['08-28','Treadmill',4,null,null],
    ['08-31','Treadmill',null,null,0.5],['09-24','Treadmill',4,null,null],['09-25','Treadmill',null,null,null],
    ['10-01','Treadmill',null,null,null],['10-06','Other',null,null,null],['10-07','Other',null,null,null],
    ['10-08','Treadmill',null,null,null],['10-12','Other',null,null,null],
  ];
  const B = [['04-01',66.5],['04-20',62.5],['10-12',67.5]];
  return {
    exercises: EX.map(([key,name,day,kind,ww,inc,tr,ts,core],i)=>({key,name,day,kind,working_weight:ww,increment:inc,target_reps:tr,target_sets:ts,core,sort_order:i})),
    sets: S.map(([d,key,w,r,t])=>({done_on:Y+d,key,weight:w,reps:r,is_test:!!t})),
    cardio: C.map(([d,m,min,cal,dist])=>({done_on:Y+d,machine:m,minutes:min,calories:cal,distance:dist})),
    bodyweight: B.map(([d,kg])=>({measured_on:Y+d,kg})),
    // progression rule should only look at sessions after the import
    ww_updated_on: '2026-10-12',
  };
})();
