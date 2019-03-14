# Schema

## Audit
- **id** - integer primary key not null
- **startedAt** - text (stores datetime)
- **network** - text
- **endpoint** - text

## Ping
- **id** - integer primary key not null
- **auditId** - integer foreign key not null
- **createdAt** - text (stores datetime)
- **result** - integer (milliseconds)
- **latitude** - double
- **longitude** - double
