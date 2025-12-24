---
title: "Attribute Extraction using OCR and custom NLP"
pubDate: "2023-11-07T18:17:53.000Z"
link: "https://codeburst.io/attribute-extraction-using-ocr-and-custom-nlp-310d8d97c3c6?source=rss-5979d543b442------2"
guid: "https://medium.com/p/310d8d97c3c6"
slug: "attribute-extraction-using-ocr-and-custom-nlp-2023-11-07t181753000z"
---

![](https://cdn-images-1.medium.com/max/1024/0*Ew3JWbU79yJ5z_qF)

Photo by [Bruno Martins](https://unsplash.com/@brunus?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

Attribute extraction from images can be a manual and cumbersome process. The information conveyed by images can be considered as true source of information as compared to the information provided by other sources.

The accuracy of the information extracted from images highlights the reliability of the source of information. With the above objective, we will explore below a method of automating the process of extracting information from images.

**OCR (Optical character recognition)**

OCR is used to extract text from images.  
We will be using [Python-tesseract](https://pypi.org/project/pytesseract/) for OCR which is a python based tool and is based upon [Google’s Tesseract-OCR](https://github.com/tesseract-ocr/tesseract) Engine. In addition it also supports different image types including jpeg, png, gif, bmp, tiff, and others.

**NLP (Natural Language Processing)**

As humans we can look at an images and co-relate to the text from the images to its related attributes. For example when we look at “_Calories 200_” written over a food label pack we know that 200 co-relates to the calories of the food. In order to develop this same analogy for machines, we need to train them. NLP helps us to achieve this, to extract meaningful information. We will be using a tool called [spacy](https://spacy.io/) , which can be used to train and develop models.

**E-commerce Catalogue use-case**

Within an e-commerce catalogue , the products are distributed across categories and each category has its own set of attributes with specific images.

The process of extracting the attributes from these images has to be specific to each category.  
  
We will select the Grocery category, most of the images from this category would have a nutrition label images and ingredients image, these images would provide significant information to the user to decide on the product choice.

![](https://cdn-images-1.medium.com/max/1024/1*GMtFZQkA3rsbzefv5MYR3A.png)

Ecom catalogue with multiple categories

**Extracting text from images**

Below is a sample image of nutrition label available on most food packages with its corresponding extracted text by OCR.

![](https://cdn-images-1.medium.com/max/266/1*07ng0UWuvBa92HhvVbVIIA.png)

Food nutrition label

Nutrition Facts Serving size 1 can Amount per serving Calories 25 % Daily Value\* Total Fat Og Saturated Fat Og Trans Fat Og Cholesterol Omg Sodium 25mg Total Carbohydrate 5g Dietary Fiber Og Total Sugars Og Includes Og Added Sugars Protein 1g Vitamin D 2mcg Calcium 22mg lron Omg Potassium 624mg Vitamin A 153mcg Vitamin C 30mg Riboflavin 3.4mg Niacin 38mg Vitamin Be 4mg \*The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice. INGREDIENTS: BREWED STARBUCKS® COFFEE (WATER, COFFEE), NATURAL FLAVORS, SUCRALOSE, INOSITOL, SODIUM ASCORBATE, MALTODEXTRIN, PANAX GINSENG ROOT EXTRACT, NIACINAMIDE, TRICALCIUM PHOSPHATE, GUARANA (PAULLINIA CUPANA) SEED EXTRACT, PYRIDOXINE HYDROCHLORIDE (VITAMIN B6), RIBOFLAVIN, VITAMIN A PALMITATE, VITAMIN D3.

**Selecting attributes**

The prominent attributes from Grocery category are: Product Net Quantity, Serving Size, Servings per container, food allergen statement, general standards and certification, total protein per serving, sugar per serving, total fat per serving, carbohydrates per serving, total calories , sodium per serving, allergen free statement, ingredients text.

![](https://cdn-images-1.medium.com/max/910/1*euHR2SJohVmqpv_YEryE8g.png)

List of attributes

After extracting the text from the images and deciding on the attributes the relevant attributes needs to be extracted from the text.

**Text extraction using NLP**

NLP is the ability for machines to understand the human language. Spacy is a library used to develop real world NLP models. For extracting attributes from OCR generated text we will be using NER (Named Entity Recognition). NER is also referred to as entity chunking or entity extraction or entity identification.

Spacy provides pre-defined models used to identify real-world objects like persons, companies or locations. But for the purpose of identifying the grocery related attributes, a custom model needs to be developed.

**Preparing the training data**

In order to develop an NLP model we need to highlight the selected attributes from the training data. For the purpose of highlighting the attributes we have used an open source tool [ner-annotator](https://tecoholic.github.io/ner-annotator/), spacy also provides a tool named [prodigy](https://prodi.gy/) for annotation.

![](https://cdn-images-1.medium.com/max/904/1*qFgmc_1CSc1pLVnQYZoCzg.png)

NER Annotator

The output provided by the training annotator is in the below format, where each text generated by OCR is denoted by entities with its start and end indices and respective attributes.

![](https://cdn-images-1.medium.com/max/904/1*5GYADZYaNpIh_ZTRNkptxg.png)

NER annotator output

The training data format generated by the annotator needs to be converted to spacy format, where each entity is converted to an array of tuple with (START\_INDEX, END\_INDEX, ATTRIBUTE).

![](https://cdn-images-1.medium.com/max/904/1*oiWmMVnE_UkAggYbAiiLHA.png)

Spacy formatted NER annotated data

**Training Model**

The spacy formatted training data is provided to the spacy pipeline for generating a custom model. The custom model needs to be built on top of pre-trained model [en\_core\_web\_lg](https://spacy.io/models/en#en_core_web_lg), which supports the English language.

Spacy has couple of components in its pipeline, when a text is passed to NLP model it passes by default through each of the components. For NER model training only the NER component needs to be used while training.

![](https://cdn-images-1.medium.com/max/904/1*XZrKC4NHuyPUSKltR3Fr5w.png)

Spacy pipelines [https://spacy.io/usage/processing-pipelines](https://spacy.io/usage/processing-pipelines)

**Testing and Visualisation**

After passing the OCR text via the generated model, the NER custom model provides the attributes with the extracted values.

![](https://cdn-images-1.medium.com/max/904/1*i-y4x6hZ78kH4JzDHCDTrA.png)

OCR generated text along with its extracted attributes

This can also be visualised by using a tool from Spacy [displaCy](https://spacy.io/universe/project/displacy)

![](https://cdn-images-1.medium.com/max/904/1*4eWo2QnxKOE56xdAAowwuQ.png)

NER model identified attributes

**Conclusion**

The accuracy of the text extraction depends on the preparation of the training data, a subject matter expert associated with a specific category can annotate the attributes in the training data and this solution can be scaled across other categories of catalogue.

#### References

1.  [https://newscatcherapi.com/blog/train-custom-named-entity-recognition-ner-model-with-spacy-v3](https://newscatcherapi.com/blog/train-custom-named-entity-recognition-ner-model-with-spacy-v3)
2.  [https://medium.com/analytics-vidhya/invoice-information-extraction-using-ocr-and-deep-learning-b79464f54d69](https://medium.com/analytics-vidhya/invoice-information-extraction-using-ocr-and-deep-learning-b79464f54d69)
3.  [https://github.com/tecoholic/ner-annotator](https://github.com/tecoholic/ner-annotator)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=310d8d97c3c6)

* * *

[Attribute Extraction using OCR and custom NLP](https://codeburst.io/attribute-extraction-using-ocr-and-custom-nlp-310d8d97c3c6) was originally published in [codeburst](https://codeburst.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.