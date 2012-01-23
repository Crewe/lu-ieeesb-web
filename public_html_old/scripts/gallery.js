function gallery(title, dir, count)
{
	for (i = 1; i <= count; i++)
	{
		document.write('<a href="images/' + dir + '/' + i + '.jpg">');
		document.write('<img src="images/' + dir + '/thumbs/' + i + '.jpg" ');
		document.write('class="img-gallery" ');
		document.write('alt="' + title + ' ' + i + '"/>');
		document.writeln('</a>');
	}
}
