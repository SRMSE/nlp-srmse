import urllib2
query=raw_input()
print "http://localhost:3000/query?q="+urllib2.quote(query)
print urllib2.urlopen("http://localhost:3000/query?q="+urllib2.quote(query)).read()