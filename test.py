import sys,urllib2
query=" ".join(sys.argv[1:])
print "http://localhost:3000/query?q="+urllib2.quote(query)
print urllib2.urlopen("http://localhost:3000/query?q="+urllib2.quote(query)).read()