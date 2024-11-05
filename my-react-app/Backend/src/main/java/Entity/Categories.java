package Entity;

import java.util.Date;

public class Categories {
    private int categoryId;
    private String categoryName;
    private Date createAt;
    private String categoryImageLink;
    private String categoryNameEng;

    public Categories(int categoryId, String categoryName, Date createAt, String categoryImageLink, String categoryNameEng) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.createAt = createAt;
        this.categoryImageLink = categoryImageLink;
        this.categoryNameEng = categoryNameEng;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getCategoryImageLink() {
        return categoryImageLink;
    }

    public void setCategoryImageLink(String categoryImageLink) {
        this.categoryImageLink = categoryImageLink;
    }

    public String getCategoryNameEng() {
        return categoryNameEng;
    }

    public void setCategoryNameEng(String categoryNameEng) {
        this.categoryNameEng = categoryNameEng;
    }

    @Override
    public String toString() {
        return "Categories{" +
                "categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                ", createAt=" + createAt +
                ", categoryImageLink='" + categoryImageLink + '\'' +
                ", categoryNameEng='" + categoryNameEng + '\'' +
                '}';
    }
}