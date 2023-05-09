const formatTitleToUrl = title => {
  //expected title from 'Some article Title' => 'some-article-title ;;

  return title.trim().toLowerCase().replaceAll(' ', '-');
};

export default formatTitleToUrl;
