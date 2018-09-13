//
// Autogenerated by Thrift Compiler (1.0.0-dev)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('woody_js/src/client/gen');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var domain_ttypes = require('./domain_types');


var ttypes = require('./domain_config_types');
//HELPER FUNCTIONS AND STRUCTURES

var RepositoryClient_checkoutObject_args = function(args) {
  this.version_ref = null;
  this.object_ref = null;
  if (args) {
    if (args.version_ref !== undefined && args.version_ref !== null) {
      this.version_ref = new ttypes.Reference(args.version_ref);
    }
    if (args.object_ref !== undefined && args.object_ref !== null) {
      this.object_ref = new domain_ttypes.Reference(args.object_ref);
    }
  }
};
RepositoryClient_checkoutObject_args.prototype = {};
RepositoryClient_checkoutObject_args.prototype.read = function(input) {
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
        this.version_ref = new ttypes.Reference();
        this.version_ref.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.object_ref = new domain_ttypes.Reference();
        this.object_ref.read(input);
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

RepositoryClient_checkoutObject_args.prototype.write = function(output) {
  output.writeStructBegin('RepositoryClient_checkoutObject_args');
  if (this.version_ref !== null && this.version_ref !== undefined) {
    output.writeFieldBegin('version_ref', Thrift.Type.STRUCT, 1);
    this.version_ref.write(output);
    output.writeFieldEnd();
  }
  if (this.object_ref !== null && this.object_ref !== undefined) {
    output.writeFieldBegin('object_ref', Thrift.Type.STRUCT, 2);
    this.object_ref.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var RepositoryClient_checkoutObject_result = function(args) {
  this.success = null;
  this.ex1 = null;
  this.ex2 = null;
  if (args instanceof ttypes.VersionNotFound) {
    this.ex1 = args;
    return;
  }
  if (args instanceof ttypes.ObjectNotFound) {
    this.ex2 = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.VersionedObject(args.success);
    }
    if (args.ex1 !== undefined && args.ex1 !== null) {
      this.ex1 = args.ex1;
    }
    if (args.ex2 !== undefined && args.ex2 !== null) {
      this.ex2 = args.ex2;
    }
  }
};
RepositoryClient_checkoutObject_result.prototype = {};
RepositoryClient_checkoutObject_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.VersionedObject();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ex1 = new ttypes.VersionNotFound();
        this.ex1.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.ex2 = new ttypes.ObjectNotFound();
        this.ex2.read(input);
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

RepositoryClient_checkoutObject_result.prototype.write = function(output) {
  output.writeStructBegin('RepositoryClient_checkoutObject_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ex1 !== null && this.ex1 !== undefined) {
    output.writeFieldBegin('ex1', Thrift.Type.STRUCT, 1);
    this.ex1.write(output);
    output.writeFieldEnd();
  }
  if (this.ex2 !== null && this.ex2 !== undefined) {
    output.writeFieldBegin('ex2', Thrift.Type.STRUCT, 2);
    this.ex2.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var RepositoryClientClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
RepositoryClientClient.prototype = {};
RepositoryClientClient.prototype.seqid = function() { return this._seqid; }
RepositoryClientClient.prototype.new_seqid = function() { return this._seqid += 1; }
RepositoryClientClient.prototype.checkoutObject = function(version_ref, object_ref, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_checkoutObject(version_ref, object_ref);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_checkoutObject(version_ref, object_ref);
  }
};

RepositoryClientClient.prototype.send_checkoutObject = function(version_ref, object_ref) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('checkoutObject', Thrift.MessageType.CALL, this.seqid());
  var args = new RepositoryClient_checkoutObject_args();
  args.version_ref = version_ref;
  args.object_ref = object_ref;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

RepositoryClientClient.prototype.recv_checkoutObject = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new RepositoryClient_checkoutObject_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex1) {
    return callback(result.ex1);
  }
  if (null !== result.ex2) {
    return callback(result.ex2);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('checkoutObject failed: unknown result');
};
var RepositoryClientProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
RepositoryClientProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

RepositoryClientProcessor.prototype.process_checkoutObject = function(seqid, input, output) {
  var args = new RepositoryClient_checkoutObject_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.checkoutObject.length === 2) {
    Q.fcall(this._handler.checkoutObject, args.version_ref, args.object_ref)
      .then(function(result) {
        var result = new RepositoryClient_checkoutObject_result({success: result});
        output.writeMessageBegin("checkoutObject", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof ttypes.VersionNotFound || err instanceof ttypes.ObjectNotFound) {
          var result = new RepositoryClient_checkoutObject_result(err);
          output.writeMessageBegin("checkoutObject", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("checkoutObject", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.checkoutObject(args.version_ref, args.object_ref, function (err, result) {
      if (err == null || err instanceof ttypes.VersionNotFound || err instanceof ttypes.ObjectNotFound) {
        var result = new RepositoryClient_checkoutObject_result((err != null ? err : {success: result}));
        output.writeMessageBegin("checkoutObject", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("checkoutObject", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

