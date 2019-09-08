from lxml import etree

root = etree.Element("root")
root.append( etree.Element("child1") )
child2 = etree.SubElement(root, "child2")
child3 = etree.SubElement(root, "child3")

# print(root[3].tag)
print(etree.tostring(root, pretty_print=True).decode('utf-8'))