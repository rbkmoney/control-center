//
// Autogenerated by Thrift Compiler (1.0.0-dev)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('woody_js/dist/thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.BoundType = {
  'inclusive' : 0,
  'exclusive' : 1
};
ttypes.DayOfWeek = {
  'Mon' : 1,
  'Tue' : 2,
  'Wed' : 3,
  'Thu' : 4,
  'Fri' : 5,
  'Sat' : 6,
  'Sun' : 7
};
ttypes.Month = {
  'Jan' : 1,
  'Feb' : 2,
  'Mar' : 3,
  'Apr' : 4,
  'May' : 5,
  'Jun' : 6,
  'Jul' : 7,
  'Aug' : 8,
  'Sep' : 9,
  'Oct' : 10,
  'Nov' : 11,
  'Dec' : 12
};
var Content = module.exports.Content = function(args) {
  this.type = null;
  this.data = null;
  if (args) {
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field type is unset!');
    }
    if (args.data !== undefined && args.data !== null) {
      this.data = args.data;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field data is unset!');
    }
  }
};
Content.prototype = {};
Content.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.type = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.data = input.readBinary();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Content.prototype.write = function(output) {
  output.writeStructBegin('Content');
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.STRING, 1);
    output.writeString(this.type);
    output.writeFieldEnd();
  }
  if (this.data !== null && this.data !== undefined) {
    output.writeFieldBegin('data', Thrift.Type.STRING, 2);
    output.writeBinary(this.data);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TimestampInterval = module.exports.TimestampInterval = function(args) {
  this.lower_bound = null;
  this.upper_bound = null;
  if (args) {
    if (args.lower_bound !== undefined && args.lower_bound !== null) {
      this.lower_bound = new ttypes.TimestampIntervalBound(args.lower_bound);
    }
    if (args.upper_bound !== undefined && args.upper_bound !== null) {
      this.upper_bound = new ttypes.TimestampIntervalBound(args.upper_bound);
    }
  }
};
TimestampInterval.prototype = {};
TimestampInterval.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.lower_bound = new ttypes.TimestampIntervalBound();
        this.lower_bound.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.upper_bound = new ttypes.TimestampIntervalBound();
        this.upper_bound.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TimestampInterval.prototype.write = function(output) {
  output.writeStructBegin('TimestampInterval');
  if (this.lower_bound !== null && this.lower_bound !== undefined) {
    output.writeFieldBegin('lower_bound', Thrift.Type.STRUCT, 1);
    this.lower_bound.write(output);
    output.writeFieldEnd();
  }
  if (this.upper_bound !== null && this.upper_bound !== undefined) {
    output.writeFieldBegin('upper_bound', Thrift.Type.STRUCT, 2);
    this.upper_bound.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TimestampIntervalBound = module.exports.TimestampIntervalBound = function(args) {
  this.bound_type = null;
  this.bound_time = null;
  if (args) {
    if (args.bound_type !== undefined && args.bound_type !== null) {
      this.bound_type = args.bound_type;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field bound_type is unset!');
    }
    if (args.bound_time !== undefined && args.bound_time !== null) {
      this.bound_time = args.bound_time;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field bound_time is unset!');
    }
  }
};
TimestampIntervalBound.prototype = {};
TimestampIntervalBound.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.bound_type = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.bound_time = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TimestampIntervalBound.prototype.write = function(output) {
  output.writeStructBegin('TimestampIntervalBound');
  if (this.bound_type !== null && this.bound_type !== undefined) {
    output.writeFieldBegin('bound_type', Thrift.Type.I32, 1);
    output.writeI32(this.bound_type);
    output.writeFieldEnd();
  }
  if (this.bound_time !== null && this.bound_time !== undefined) {
    output.writeFieldBegin('bound_time', Thrift.Type.STRING, 2);
    output.writeString(this.bound_time);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TimeSpan = module.exports.TimeSpan = function(args) {
  this.years = null;
  this.months = null;
  this.days = null;
  this.hours = null;
  this.minutes = null;
  this.seconds = null;
  if (args) {
    if (args.years !== undefined && args.years !== null) {
      this.years = args.years;
    }
    if (args.months !== undefined && args.months !== null) {
      this.months = args.months;
    }
    if (args.days !== undefined && args.days !== null) {
      this.days = args.days;
    }
    if (args.hours !== undefined && args.hours !== null) {
      this.hours = args.hours;
    }
    if (args.minutes !== undefined && args.minutes !== null) {
      this.minutes = args.minutes;
    }
    if (args.seconds !== undefined && args.seconds !== null) {
      this.seconds = args.seconds;
    }
  }
};
TimeSpan.prototype = {};
TimeSpan.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I16) {
        this.years = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I16) {
        this.months = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I16) {
        this.days = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I16) {
        this.hours = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I16) {
        this.minutes = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.I16) {
        this.seconds = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TimeSpan.prototype.write = function(output) {
  output.writeStructBegin('TimeSpan');
  if (this.years !== null && this.years !== undefined) {
    output.writeFieldBegin('years', Thrift.Type.I16, 1);
    output.writeI16(this.years);
    output.writeFieldEnd();
  }
  if (this.months !== null && this.months !== undefined) {
    output.writeFieldBegin('months', Thrift.Type.I16, 2);
    output.writeI16(this.months);
    output.writeFieldEnd();
  }
  if (this.days !== null && this.days !== undefined) {
    output.writeFieldBegin('days', Thrift.Type.I16, 4);
    output.writeI16(this.days);
    output.writeFieldEnd();
  }
  if (this.hours !== null && this.hours !== undefined) {
    output.writeFieldBegin('hours', Thrift.Type.I16, 5);
    output.writeI16(this.hours);
    output.writeFieldEnd();
  }
  if (this.minutes !== null && this.minutes !== undefined) {
    output.writeFieldBegin('minutes', Thrift.Type.I16, 6);
    output.writeI16(this.minutes);
    output.writeFieldEnd();
  }
  if (this.seconds !== null && this.seconds !== undefined) {
    output.writeFieldBegin('seconds', Thrift.Type.I16, 7);
    output.writeI16(this.seconds);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Schedule = module.exports.Schedule = function(args) {
  this.year = null;
  this.month = null;
  this.day_of_month = null;
  this.day_of_week = null;
  this.hour = null;
  this.minute = null;
  this.second = null;
  if (args) {
    if (args.year !== undefined && args.year !== null) {
      this.year = new ttypes.ScheduleYear(args.year);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field year is unset!');
    }
    if (args.month !== undefined && args.month !== null) {
      this.month = new ttypes.ScheduleMonth(args.month);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field month is unset!');
    }
    if (args.day_of_month !== undefined && args.day_of_month !== null) {
      this.day_of_month = new ttypes.ScheduleFragment(args.day_of_month);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field day_of_month is unset!');
    }
    if (args.day_of_week !== undefined && args.day_of_week !== null) {
      this.day_of_week = new ttypes.ScheduleDayOfWeek(args.day_of_week);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field day_of_week is unset!');
    }
    if (args.hour !== undefined && args.hour !== null) {
      this.hour = new ttypes.ScheduleFragment(args.hour);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field hour is unset!');
    }
    if (args.minute !== undefined && args.minute !== null) {
      this.minute = new ttypes.ScheduleFragment(args.minute);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field minute is unset!');
    }
    if (args.second !== undefined && args.second !== null) {
      this.second = new ttypes.ScheduleFragment(args.second);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field second is unset!');
    }
  }
};
Schedule.prototype = {};
Schedule.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.year = new ttypes.ScheduleYear();
        this.year.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.month = new ttypes.ScheduleMonth();
        this.month.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRUCT) {
        this.day_of_month = new ttypes.ScheduleFragment();
        this.day_of_month.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.day_of_week = new ttypes.ScheduleDayOfWeek();
        this.day_of_week.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRUCT) {
        this.hour = new ttypes.ScheduleFragment();
        this.hour.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRUCT) {
        this.minute = new ttypes.ScheduleFragment();
        this.minute.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRUCT) {
        this.second = new ttypes.ScheduleFragment();
        this.second.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Schedule.prototype.write = function(output) {
  output.writeStructBegin('Schedule');
  if (this.year !== null && this.year !== undefined) {
    output.writeFieldBegin('year', Thrift.Type.STRUCT, 1);
    this.year.write(output);
    output.writeFieldEnd();
  }
  if (this.month !== null && this.month !== undefined) {
    output.writeFieldBegin('month', Thrift.Type.STRUCT, 2);
    this.month.write(output);
    output.writeFieldEnd();
  }
  if (this.day_of_month !== null && this.day_of_month !== undefined) {
    output.writeFieldBegin('day_of_month', Thrift.Type.STRUCT, 3);
    this.day_of_month.write(output);
    output.writeFieldEnd();
  }
  if (this.day_of_week !== null && this.day_of_week !== undefined) {
    output.writeFieldBegin('day_of_week', Thrift.Type.STRUCT, 4);
    this.day_of_week.write(output);
    output.writeFieldEnd();
  }
  if (this.hour !== null && this.hour !== undefined) {
    output.writeFieldBegin('hour', Thrift.Type.STRUCT, 5);
    this.hour.write(output);
    output.writeFieldEnd();
  }
  if (this.minute !== null && this.minute !== undefined) {
    output.writeFieldBegin('minute', Thrift.Type.STRUCT, 6);
    this.minute.write(output);
    output.writeFieldEnd();
  }
  if (this.second !== null && this.second !== undefined) {
    output.writeFieldBegin('second', Thrift.Type.STRUCT, 7);
    this.second.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ScheduleEvery = module.exports.ScheduleEvery = function(args) {
  this.nth = null;
  if (args) {
    if (args.nth !== undefined && args.nth !== null) {
      this.nth = args.nth;
    }
  }
};
ScheduleEvery.prototype = {};
ScheduleEvery.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BYTE) {
        this.nth = input.readByte();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ScheduleEvery.prototype.write = function(output) {
  output.writeStructBegin('ScheduleEvery');
  if (this.nth !== null && this.nth !== undefined) {
    output.writeFieldBegin('nth', Thrift.Type.BYTE, 1);
    output.writeByte(this.nth);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ScheduleFragment = module.exports.ScheduleFragment = function(args) {
  this.every = null;
  this.on = null;
  if (args) {
    if (args.every !== undefined && args.every !== null) {
      this.every = new ttypes.ScheduleEvery(args.every);
    }
    if (args.on !== undefined && args.on !== null) {
      this.on = Thrift.copyList(args.on, [null]);
    }
  }
};
ScheduleFragment.prototype = {};
ScheduleFragment.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.every = new ttypes.ScheduleEvery();
        this.every.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.SET) {
        var _size0 = 0;
        var _rtmp34;
        this.on = [];
        var _etype3 = 0;
        _rtmp34 = input.readSetBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readByte();
          this.on.push(elem6);
        }
        input.readSetEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ScheduleFragment.prototype.write = function(output) {
  output.writeStructBegin('ScheduleFragment');
  if (this.every !== null && this.every !== undefined) {
    output.writeFieldBegin('every', Thrift.Type.STRUCT, 1);
    this.every.write(output);
    output.writeFieldEnd();
  }
  if (this.on !== null && this.on !== undefined) {
    output.writeFieldBegin('on', Thrift.Type.SET, 2);
    output.writeSetBegin(Thrift.Type.BYTE, this.on.length);
    for (var iter7 in this.on)
    {
      if (this.on.hasOwnProperty(iter7))
      {
        iter7 = this.on[iter7];
        output.writeByte(iter7);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ScheduleDayOfWeek = module.exports.ScheduleDayOfWeek = function(args) {
  this.every = null;
  this.on = null;
  if (args) {
    if (args.every !== undefined && args.every !== null) {
      this.every = new ttypes.ScheduleEvery(args.every);
    }
    if (args.on !== undefined && args.on !== null) {
      this.on = Thrift.copyList(args.on, [null]);
    }
  }
};
ScheduleDayOfWeek.prototype = {};
ScheduleDayOfWeek.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.every = new ttypes.ScheduleEvery();
        this.every.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.SET) {
        var _size8 = 0;
        var _rtmp312;
        this.on = [];
        var _etype11 = 0;
        _rtmp312 = input.readSetBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = input.readI32();
          this.on.push(elem14);
        }
        input.readSetEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ScheduleDayOfWeek.prototype.write = function(output) {
  output.writeStructBegin('ScheduleDayOfWeek');
  if (this.every !== null && this.every !== undefined) {
    output.writeFieldBegin('every', Thrift.Type.STRUCT, 1);
    this.every.write(output);
    output.writeFieldEnd();
  }
  if (this.on !== null && this.on !== undefined) {
    output.writeFieldBegin('on', Thrift.Type.SET, 2);
    output.writeSetBegin(Thrift.Type.I32, this.on.length);
    for (var iter15 in this.on)
    {
      if (this.on.hasOwnProperty(iter15))
      {
        iter15 = this.on[iter15];
        output.writeI32(iter15);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ScheduleMonth = module.exports.ScheduleMonth = function(args) {
  this.every = null;
  this.on = null;
  if (args) {
    if (args.every !== undefined && args.every !== null) {
      this.every = new ttypes.ScheduleEvery(args.every);
    }
    if (args.on !== undefined && args.on !== null) {
      this.on = Thrift.copyList(args.on, [null]);
    }
  }
};
ScheduleMonth.prototype = {};
ScheduleMonth.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.every = new ttypes.ScheduleEvery();
        this.every.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.SET) {
        var _size16 = 0;
        var _rtmp320;
        this.on = [];
        var _etype19 = 0;
        _rtmp320 = input.readSetBegin();
        _etype19 = _rtmp320.etype;
        _size16 = _rtmp320.size;
        for (var _i21 = 0; _i21 < _size16; ++_i21)
        {
          var elem22 = null;
          elem22 = input.readI32();
          this.on.push(elem22);
        }
        input.readSetEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ScheduleMonth.prototype.write = function(output) {
  output.writeStructBegin('ScheduleMonth');
  if (this.every !== null && this.every !== undefined) {
    output.writeFieldBegin('every', Thrift.Type.STRUCT, 1);
    this.every.write(output);
    output.writeFieldEnd();
  }
  if (this.on !== null && this.on !== undefined) {
    output.writeFieldBegin('on', Thrift.Type.SET, 2);
    output.writeSetBegin(Thrift.Type.I32, this.on.length);
    for (var iter23 in this.on)
    {
      if (this.on.hasOwnProperty(iter23))
      {
        iter23 = this.on[iter23];
        output.writeI32(iter23);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ScheduleYear = module.exports.ScheduleYear = function(args) {
  this.every = null;
  this.on = null;
  if (args) {
    if (args.every !== undefined && args.every !== null) {
      this.every = new ttypes.ScheduleEvery(args.every);
    }
    if (args.on !== undefined && args.on !== null) {
      this.on = Thrift.copyList(args.on, [null]);
    }
  }
};
ScheduleYear.prototype = {};
ScheduleYear.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.every = new ttypes.ScheduleEvery();
        this.every.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.SET) {
        var _size24 = 0;
        var _rtmp328;
        this.on = [];
        var _etype27 = 0;
        _rtmp328 = input.readSetBegin();
        _etype27 = _rtmp328.etype;
        _size24 = _rtmp328.size;
        for (var _i29 = 0; _i29 < _size24; ++_i29)
        {
          var elem30 = null;
          elem30 = input.readI32();
          this.on.push(elem30);
        }
        input.readSetEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ScheduleYear.prototype.write = function(output) {
  output.writeStructBegin('ScheduleYear');
  if (this.every !== null && this.every !== undefined) {
    output.writeFieldBegin('every', Thrift.Type.STRUCT, 1);
    this.every.write(output);
    output.writeFieldEnd();
  }
  if (this.on !== null && this.on !== undefined) {
    output.writeFieldBegin('on', Thrift.Type.SET, 2);
    output.writeSetBegin(Thrift.Type.I32, this.on.length);
    for (var iter31 in this.on)
    {
      if (this.on.hasOwnProperty(iter31))
      {
        iter31 = this.on[iter31];
        output.writeI32(iter31);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Rational = module.exports.Rational = function(args) {
  this.p = null;
  this.q = null;
  if (args) {
    if (args.p !== undefined && args.p !== null) {
      this.p = args.p;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field p is unset!');
    }
    if (args.q !== undefined && args.q !== null) {
      this.q = args.q;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field q is unset!');
    }
  }
};
Rational.prototype = {};
Rational.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.p = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.q = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Rational.prototype.write = function(output) {
  output.writeStructBegin('Rational');
  if (this.p !== null && this.p !== undefined) {
    output.writeFieldBegin('p', Thrift.Type.I64, 1);
    output.writeI64(this.p);
    output.writeFieldEnd();
  }
  if (this.q !== null && this.q !== undefined) {
    output.writeFieldBegin('q', Thrift.Type.I64, 2);
    output.writeI64(this.q);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Timer = module.exports.Timer = function(args) {
  this.timeout = null;
  this.deadline = null;
  if (args) {
    if (args.timeout !== undefined && args.timeout !== null) {
      this.timeout = args.timeout;
    }
    if (args.deadline !== undefined && args.deadline !== null) {
      this.deadline = args.deadline;
    }
  }
};
Timer.prototype = {};
Timer.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.timeout = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.deadline = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Timer.prototype.write = function(output) {
  output.writeStructBegin('Timer');
  if (this.timeout !== null && this.timeout !== undefined) {
    output.writeFieldBegin('timeout', Thrift.Type.I32, 1);
    output.writeI32(this.timeout);
    output.writeFieldEnd();
  }
  if (this.deadline !== null && this.deadline !== undefined) {
    output.writeFieldBegin('deadline', Thrift.Type.STRING, 2);
    output.writeString(this.deadline);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var InvalidRequest = module.exports.InvalidRequest = function(args) {
  Thrift.TException.call(this, "InvalidRequest")
  this.name = "InvalidRequest"
  this.errors = null;
  if (args) {
    if (args.errors !== undefined && args.errors !== null) {
      this.errors = Thrift.copyList(args.errors, [null]);
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field errors is unset!');
    }
  }
};
Thrift.inherits(InvalidRequest, Thrift.TException);
InvalidRequest.prototype.name = 'InvalidRequest';
InvalidRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        var _size32 = 0;
        var _rtmp336;
        this.errors = [];
        var _etype35 = 0;
        _rtmp336 = input.readListBegin();
        _etype35 = _rtmp336.etype;
        _size32 = _rtmp336.size;
        for (var _i37 = 0; _i37 < _size32; ++_i37)
        {
          var elem38 = null;
          elem38 = input.readString();
          this.errors.push(elem38);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

InvalidRequest.prototype.write = function(output) {
  output.writeStructBegin('InvalidRequest');
  if (this.errors !== null && this.errors !== undefined) {
    output.writeFieldBegin('errors', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.STRING, this.errors.length);
    for (var iter39 in this.errors)
    {
      if (this.errors.hasOwnProperty(iter39))
      {
        iter39 = this.errors[iter39];
        output.writeString(iter39);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

